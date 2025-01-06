import json
import requests
import time

# Naver Cloud Papago Text Translation (UPDATED 2024+)
# 콘솔에서 발급받은 값
NAVER_CLIENT_ID = "gknbwfvhxc"         # 예: '0o1g2abc3456...' 
NAVER_CLIENT_SECRET = "AbTSyXBiMMwN0StznW3NXLjEmPZZEfWiPxMF3u4L" # 예: 'R9abcXYZ...'
PAPAGO_URL = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation" 
# ↑ 문서에 따라 변경 가능 (최신 정보 확인)

def translate_text_papago(text, src="ko", tgt="en"):
    """Papago Text Translation API 호출 (최신, 2024+ 유료)"""
    text = text.strip()
    if not text:
        return text

    headers = {
        "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    data = {
        "source": src,
        "target": tgt,
        "text": text
    }

    for attempt in range(3):  # 재시도 최대 3번
        try:
            resp = requests.post(PAPAGO_URL, headers=headers, data=data, timeout=5)
            resp.raise_for_status()

            # Papago Text Translation의 응답 형식
            # 예: { "translatedText": "Hello" }
            result_json = resp.json()

            message = result_json.get("message", {})
            result = message.get("result", {})
            translated = result.get("translatedText", None) 
            if not translated:
                # 혹은 message / result / translatedText 구조일 수도 있음
                # 최신 문서 확인
                print("Papago response missing 'translatedText':", result_json)
                return text
            return translated

        except requests.exceptions.RequestException as e:
            print(f"[Papago Error] {e}, attempt={attempt+1}")
            time.sleep(1)
    return text  # 실패 시 원문 반환

def translate_recipe_object(recipe_obj):
    """레시피 한 개 객체 내부의 한글 필드를 영어로"""
    # 번역할 필드 목록
    fields_to_translate = [
        "rcpNm",         # 메뉴명
        "rcpWay2",       # 조리방법
        "rcpPat2",       # 요리종류
        "rcpPartsDtls",  # 재료정보
        "hashTag", 
        "rcpNaTip"       # TIP
    ]

    for field in fields_to_translate:
        if field in recipe_obj and recipe_obj[field]:
            recipe_obj[field] = translate_text_papago(recipe_obj[field])

    # manualSteps[].content 번역
    if "manualSteps" in recipe_obj:
        for step in recipe_obj["manualSteps"]:
            if "content" in step and step["content"]:
                step["content"] = translate_text_papago(step["content"])

    return recipe_obj

def main():
    # 1) 원본 JSON (한국어) 로드
    with open("recipes.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    if not isinstance(data, list):
        print("recipes.json is not a list of objects.")
        return

    translated_data = []
    total = len(data)

    for i, recipe in enumerate(data):
        rcpSeq = recipe.get("rcpSeq")
        print(f"Translating recipe {i+1}/{total} (rcpSeq={rcpSeq})")
        recipe_en = translate_recipe_object(recipe)
        translated_data.append(recipe_en)
        # 과금 + rate limit 관리
        # 너무 빠르게 요청하면 할당량 초과 or 429
        time.sleep(0.2)  # 0.2초 휴식 (필요시 조정)

    # 2) 결과 저장
    with open("recipes_en.json", "w", encoding="utf-8") as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)

    print("Done: recipes_en.json created.")

if __name__ == "__main__":
    main()
