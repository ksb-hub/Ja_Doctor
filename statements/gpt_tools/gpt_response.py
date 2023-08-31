import json
import os
from pathlib import Path

import openai
from django.core.exceptions import ImproperlyConfigured


def get_key_from_file():
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    secret_file = os.path.join(BASE_DIR, 'openai_key.json')
    with open(secret_file) as f:
        secrets = json.load(f)

    return secrets.get("KEY", None)


def get_key():
    key = get_key_from_file()
    if key is None:
        raise ImproperlyConfigured("API 키를 설정하세요.")
    return key

# # param v1
# def get_param():
#     parameters = {
#         "temperature": 1,
#         "top_p": 0.7,
#         "frequency_penalty": 1,
#         "presence_penalty": 2,
#         "max_tokens": 13000,
#     }
#
#     return parameters

# param v2
def get_params():
    return {
        "temperature": 0.6,  # Lower temperature might give more focused output
        "top_p": 0.8,
        "frequency_penalty": 1,
        "presence_penalty": 2,
        "max_tokens": 7000,  # Lower max tokens if you want shorter output
    }


# def get_schema():
#     # schema version 1.1
#     schema = {
#         "type": "object",
#         "properties": {
#             "title": {
#                 "type": "string",
#                 "description": "The title of the essay. Must be contained in a line."
#             },
#             "content": {
#                 "type": "object",
#                 "properties": {
#                     "modified_text": {
#                         "type": "string",
#                         "description": "The Whole Revised Cover Letter."
#                     },
#                     "explanation": {
#                         "type": "string",
#                         "description": "Description of the modifications. Why did you modify that?"
#                     },
#                 },
#                 "required": [
#                     "modified_text",
#                     "explanation"
#                 ]
#             }
#         }
#     }
#
#     return schema


# def get_schema():
#     # schema version 1.2
#     schema = {
#         "type": "object",
#         "properties": {
#             "content": {
#                 "type": "object",
#                 "properties": {
#                     "edited_text": {
#                         "type": "string",
#                         "description": "The revised cover letter with modifications."
#                     },
#                     "explanation": {
#                         "type": "string",
#                         "description": "Explanation of the modifications made. Why did you modify?"
#                     }
#                 },
#                 "required": [
#                     "edited_text",
#                     "explanation"
#                 ]
#             }
#         },
#         "required": [
#                 "content"
#             ]
#     }
#
#     return schema


# def get_schema():
#     # schema version 2.0
#     schema = {
#         "type": "object",
#         "properties": {
#             "input": {
#                 "type": "object",
#                 "properties": {
#                     "original_text": {
#                         "type": "string",
#                         "description": "The original cover letter provided by the user."
#                     },
#                     "modification_request": {
#                         "type": "string",
#                         "description": "User's request for modifying the cover letter."
#                     }
#                 },
#                 "required": ["original_text", "modification_request"]
#             },
#             "output": {
#                 "type": "object",
#                 "properties": {
#                     "modified_text": {
#                         "type": "string",
#                         "description": "The revised cover letter with modifications."
#                     },
#                     "explanation": {
#                         "type": "string",
#                         "description": "Explanation of the modifications made. Why did you modify?"
#                     },
#                     "additional_sections": {
#                         "type": "array",
#                         "items": {
#                             "type": "object",
#                             "properties": {
#                                 "section_title": {
#                                     "type": "string",
#                                     "description": "The title of the additional section."
#                                 },
#                                 "section_content": {
#                                     "type": "string",
#                                     "description": "The content of the additional section."
#                                 }
#                             },
#                             "required": ["section_title", "section_content"]
#                         },
#                         "description": "Additional sections or points that were added to the cover letter."
#                     }
#                 },
#                 "required": ["modified_text", "explanation"]
#             }
#         },
#         "required": ["input", "output"]
#     }
#
#     return schema


def get_schema():
    # schema version 2.1
    schema = {
        "type": "object",
        "properties": {
            "output": {
                "type": "object",
                "properties": {
                    "modified_text": {
                        "type": "string",
                        "description": "The revised cover letter with modifications."
                    },
                    "explanation": {
                        "type": "string",
                        "description": "Explanation of the modifications made. Why did you modify?"
                    },
                    "additional_sections": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "section_title": {
                                    "type": "string",
                                    "description": "The title of the additional section."
                                },
                                "section_content": {
                                    "type": "string",
                                    "description": "The content of the additional section."
                                }
                            },
                            "required": ["section_title", "section_content"]
                        },
                        "description": "Additional sections or points that were added to the cover letter."
                    }
                },
                "required": ["modified_text", "explanation"]
            }
        },
        "required": ["output"]
    }

    return schema



# preprocessing v1
def preprocess_data(data):
    cleared_data = data.replace(',\n  }', '\n  }')
    cleared_data = cleared_data.replace('\\ n \\', '\\n')
    cleared_data = cleared_data.replace('\\ n', '\\n')
    cleared_data = cleared_data.replace('\\N', '\\n')
    cleared_data = cleared_data.replace('\\n\\\n', '\\n\\n')

    error_count_open = cleared_data.count('{')
    error_count_close = cleared_data.count('}')
    if error_count_close != error_count_open:
        cleared_data += '"'+'}' * (error_count_open-error_count_close)

    return cleared_data


# A function for gpt learning direction
def return_edited_essay(res):
    return {
        "output": {
            "modified_text": res.get("output", {}).get("modified_text", ""),
            "explanation": res.get("output", {}).get("explanation", ""),
            "additional_sections": res.get("output", {}).get("additional_sections", [])
        }
    }


def call_gpt(content, order):
    print(type(content), type(order))
    openai.api_key = get_key()
    parameters = get_params()
    schema = get_schema()
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant specialized in expanding and improving cover letters. Focus "
                           + "on adding new content and details rather than removing existing text from the user's "
                           + "cover letter. Elaborate on the user's points based on their modification request. Respond "
                           + "in Korean."
            },
            {
                "role": "user",
                "content": f"original_text : {content}\n"
                           + f"modification_request: {order}"
            },
        ],

        # Implement a function call with JSON output schema
        functions=[{
            "name": "return_edited_essay",
            "description": "Returns the full text of the modifications and an explanation of the modifications made.",
            "parameters": schema
        }],
        # Define the function which needs to be called when the output has received
        function_call={
            "name": "return_edited_essay"
        },
        **parameters
    )
    print("여기")
    res = response["choices"][0]["message"]["function_call"]["arguments"].strip()
    print(res)
    return return_edited_essay(json.loads(preprocess_data(res)))


def get_advice(content, order):
    print(type(content), type(order))
    advice = call_gpt(content, order)
    # return {
    #     "content": {
    #         "modified_text": advice.get("main_text", ""),
    #         "explanation": advice.get("explanation", "")
    #     }
    # }
    return advice