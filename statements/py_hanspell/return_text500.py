# 요청된 문자열을 500자 마다 잘라서 문자열 리스트를 반환합니다.

def operator(text):
    seq = text
    length = 499
    str_list = [seq[i:i+length] for i in range(0, len(seq), length)]
    return str_list
