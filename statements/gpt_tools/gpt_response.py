import json
import os
from pathlib import Path

import openai
from django.core.exceptions import ImproperlyConfigured


def get_key():
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    secret_file = os.path.join(BASE_DIR, 'openai_key.json')

    with open(secret_file) as f:
        secrets = json.loads(f.read())

    def get_secret(setting):
        """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
        try:
            return secrets[setting]
        except KeyError:
            error_msg = "Set the {} environment variable".format(setting)
            raise ImproperlyConfigured(error_msg)

    key = get_secret("KEY")

    return key


def get_param():
    parameters = {
        "temperature": 0.9,
        "top_p": 0.8,
        "frequency_penalty": 1,
        "presence_penalty": 0.85,
        "max_tokens": 15000,
    }

    return parameters


def get_schema():
    # schema version 1.1
    schema = {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "The title of the essay. Must be contained in a line."
            },
            "content": {
                "type": "object",
                "properties": {
                    "modified_text": {
                        "type": "string",
                        "description": "The Whole Revised Cover Letter."
                    },
                    "explanation": {
                        "type": "string",
                        "description": "Description of the modifications. Why did you modify that?"
                    },
                },
                "required": [
                    "modified_text",
                    "explanation"
                ]
            }
        }
    }

    return schema


def preprocessing(data):
    cleared_data = data.replace(',\n  }', '\n  }')
    return cleared_data


# A function for gpt learning direction
def return_edited_essay(main_text, explanation):
    res = {
        "title": main_text,
        "content": explanation
    }
    return res


def call_gpt(content, order):
    openai.api_key = get_key()
    parameters = get_param()
    schema = get_schema()
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "Suppose you are an expert who corrects and" +
                           " the letter of self-introduction and add texts to your request."
            },
            {
                "role": "user",
                "content": f"A letter of self-introduction : {content} \n\n Requested term: {order} \n\n\n"
                           + "You must correct the letter of self-introduction given to the requested term .\n"
                           + "If necessary, you can add a new paragraph.\n\n\n"
            }
        ],
        # Implement a function call with JSON output schema
        functions=[{
            "name": "return_edited_essay",
            "description": "Returns the full text of the modifications and a description of the modifications made to suit your request.",
            "parameters": schema
        }],
        # Define the function which needs to be called when the output has received
        function_call={
            "name": "return_edited_essay"
        },
        temperature=parameters["temperature"],
        top_p=parameters["top_p"],
        frequency_penalty=parameters["frequency_penalty"],
        presence_penalty=parameters["presence_penalty"],
        max_tokens=parameters["max_tokens"],
    )

    res = response["choices"][0]["message"]["function_call"]["arguments"]

    advice = preprocessing(res)
    return advice


def get_advice(content, order):
    advice = call_gpt(content, order)
    return advice