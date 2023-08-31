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
        "temperature": 0.2,  # Lower temperature might give more focused output
        "top_p": 0.8,
        "frequency_penalty": 1,
        "presence_penalty": 2,
        "max_tokens": 7000,  # Lower max tokens if you want shorter output
    }


def get_schema():
    # schema version 2.2
    schema = {
        "type": "object",
        "properties": {
            "output": {
                "type": "object",
                "properties": {
                    "modified_text": {
                        "type": "string",
                        "description": "The revised cover letter with additional content."
                    },
                    "explanation": {
                        "type": "string",
                        "description": "Explanation of the additions made. Why did you add new content?"
                    },
                    "additional_sections": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "section_title": {
                                    "type": "string",
                                    "description": "The title of the newly added section."
                                },
                                "section_content": {
                                    "type": "string",
                                    "description": "The content of the newly added section."
                                }
                            },
                            "required": ["section_title", "section_content"]
                        },
                        "description": "Newly added sections or points to the cover letter."
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
    len_threshold = len(content) + 150
    response1 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant specialized in expanding and improving cover letters."
                            + "Your primary focus"
                            + "should be on adding valuable new content and sections, rather than editing or removing "
                            + "existing parts."
                            + "Please elaborate and expand upon the user's existing points in accordance with their "
                            + "modification requests."
                            + "All your responses should be in Korean."

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

    res1 = return_edited_essay(json.loads(preprocess_data(response1["choices"][0]["message"]["function_call"]["arguments"].strip())))
    # first_length = len(res1["output"]['modified_text'])
    # if first_length < len_threshold:
    #     # 두 번째 요청 (Follow-Up)
    #     # print(res1["output"]['modified_text'])
    #     text_dict = {"modified_text": res1["output"]['modified_text']}
    #     response2 = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo-16k",
    #         messages=[
    #             {"role": "assistant", "content": f"original_text : {str(text_dict)}\n" + f"modification_request: {order}"},
    #             {"role": "user", "content": "Can you write more details? Write in korean."}
    #         ],
    #         functions=[{
    #             "name": "return_edited_essay",
    #             "description": "Returns the full text of the modifications and an explanation of the modifications made.",
    #             "parameters": schema
    #         }],
    #         # Define the function which needs to be called when the output has received
    #         function_call={
    #             "name": "return_edited_essay"
    #         },
    #         **parameters
    #     )
    #     res2 = return_edited_essay(json.loads(preprocess_data(response2["choices"][0]["message"]["function_call"]["arguments"].strip())))
    #     print("return 2")
    #     return res2
    # print("return 1")
    return res1


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