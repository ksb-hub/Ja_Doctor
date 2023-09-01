import json
import os
from pathlib import Path
import openai
from django.core.exceptions import ImproperlyConfigured


def get_key_from_file(file_path):
    with open(file_path) as f:
        secrets = json.load(f)
    return secrets.get("KEY", None)


def get_key(file_path='openai_key.json'):
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    secret_file = os.path.join(BASE_DIR, file_path)
    key = get_key_from_file(secret_file)
    if key is None:
        raise ImproperlyConfigured("API key is not set.")
    return key


def get_params():
    # params v1.1
    return {
        "temperature": 0.6,
        "top_p": 0.8,
        "frequency_penalty": 1,
        "presence_penalty": 2,
        "max_tokens": 13000,
    }

# def get_params():
#     # params v1.2
#     return {
#         "temperature": 0.7,  # 응답의 다양성을 높이기 위해 약간 높임
#         "top_p": 0.85,       # 다양한 단어와 구문을 쓰게 하기 위해 약간 높임
#         "frequency_penalty": 0.5,  # 흔하지 않은 단어나 표현도 사용하도록 함
#         "presence_penalty": 2,  # 모델이 더 많은 내용을 추가하도록 함
#         "max_tokens": 13000,  # 가능한 한 많은 내용을 포함하기 위해 그대로 둠
#     }


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


def construct_prompt(content, order):
    return [
        #  #prompt ver 1.1
        # {
        #     "role": "system",
        #     "content": "당신은 제공된 요청사항에 따라 원문에 새로운 새용을 추가해 주는 전문가입니다.\n" +
        #                "모든 응답은 한국어로 해 주세요.\n" +
        #                "원문에 비해 확연히 달라진 내용을 반환해야 합니다.\n" +
        #                "원문의 내용 요약이나 삭제는 최소화해야 합니다.\n\n"
        # },
        #  #prompt ver 1.2
        # {
        #     "role": "system",
        #     "content": "당신은 제공된 요청사항에 따라 원문에 새로운 내용을 풍성하게 추가해 주는 전문가입니다.\n" +
        #                "모든 응답은 한국어로 해 주세요.\n" +
        #                "원문에 존재하는 내용은 최대한 그대로 유지하면서, 새로운 섹션, 예시, 설명 등을 상세하게 추가해 주세요.\n" +
        #                "기존 내용의 요약이나 삭제는 피하고, 새로운 정보나 통찰을 중점적으로 추가해야 합니다.\n" +
        #                "해당 지시를 따르지 않을 경우, 작업이 실패한 것으로 간주됩니다.\n\n"
        # },
        # prompt ver 1.3
        {
            "role": "system",
            "content": "당신은 원문에 존재하는 내용을 보완하고, 다양한 새로운 요소와 내용을 추가하는 전문가입니다.\n" +
                       "반드시 모든 응답은 한국어로 해 주세요.\n" +
                       "원문의 기존 내용은 보존하고, 요청사항에 맞게 아래와 같은 방법으로 내용을 추가해 주세요:\n" +
                       "- 기존의 섹션은 되도록 삭제하지 않음\n" +
                       "- 원문의 내용보다 훨씬 길게 작성\n" +
                       "- 새로운 섹션 추가\n" +
                       "- 관련된 예시나 사례 제공\n" +
                       "- 통계나 데이터를 활용한 설명\n" +
                       "- 인용문 또는 참고 문헌 추가\n" +
                       "작업이 이러한 지침에 부합하지 않으면, 작업이 실패한 것으로 간주됩니다.\n\n"
        },
        {
            "role": "user",
            "content": f"원문 : {content}\n\n\n"
                       + f"요청사항: {order}\n\n"
                       + "보강된 내용: "
        },
    ]


def return_edited_essay(res):
    return {
        "output": {
            "renewal_text": res.get("output", {}).get("renewal_text", ""),
            "explanation": res.get("output", {}).get("explanation", ""),
            "modification_success": res.get("output", {}).get("modification_success", False),
        }
    }


def call_openai_api(messages, function_call_name='return_edited_essay'):
    openai.api_key = get_key()
    params = get_params()
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=messages,
        functions=[{
            "name": function_call_name,
            "description": "Returns the full text of the modifications and an explanation of the modifications made.",
            "parameters": get_schema()
        }],
        function_call={
            "name": function_call_name
        },
        **params
    )
    return response


def extract_and_preprocess_response(response):
    return json.loads(preprocess_data(response["choices"][0]["message"]["function_call"]["arguments"].strip()))


def get_schema():
    # schema version 2.3
    schema = {
        "type": "object",
        "properties": {
            "output": {
                "type": "object",
                "properties": {
                    "renewal_text": {
                        "type": "string",
                        "description": "Renewal self-introduce statement. It must contain the added content."
                    },
                    "explanation": {
                        "type": "string",
                        "description": "Explanation of the additions made. Why did you add new content?"
                    },
                    "modification_success": {
                        "type": "boolean",
                        "description": "Whether the modification request has been implemented successfully"
                    }
                },
                "required": ["renewal_text", "explanation", "modification_success"]
            }
        },
        "required": ["output"]
    }

    return schema


def get_advice(content, order):
    prompt = construct_prompt(content, order)
    api_response = call_openai_api(prompt)
    raw_result = extract_and_preprocess_response(api_response)
    result = {
        "output": {
            "renewal_text": raw_result.get("output", {}).get("renewal_text", ""),
            "explanation": raw_result.get("output", {}).get("explanation", ""),
            "modification_success": raw_result.get("output", {}).get("modification_success", False),
        }
    }
    return result
