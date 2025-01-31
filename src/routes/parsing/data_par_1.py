import json

# 필터링할 키워드 리스트
exclude_keywords  = ["샐러드","다이어트", "석류","나가사키","크러스트","파스타", "브로콜리", "과일", "스프", "스테이크", "곤약", "요거트","방울토마토", "라따뚜이", "카프레제", "아보카도", "콩고기", "토마토", "소스", "주스", "오렌지", "바나나", "키위", "레몬"]

# JSON 파일 로드
file_path = "recipes.json"  # JSON 파일 경로를 입력하세요
with open(file_path, "r", encoding="utf-8") as file:
    recipes = json.load(file)

# 특정 키워드를 포함하지 않는 레시피 필터링 함수
def filter_out_recipes(recipes, exclude_keywords):
    filtered_recipes = [
        recipe for recipe in recipes if not any(keyword in recipe["rcpNm"] for keyword in exclude_keywords)
    ]
    return filtered_recipes

# 필터링 실행 (제외할 키워드가 없는 레시피만 남김)
filtered_recipes = filter_out_recipes(recipes, exclude_keywords)

# 결과 JSON 파일로 저장
output_file = "filtered_recipes_excluded.json"
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(filtered_recipes, file, ensure_ascii=False, indent=4)

# 필터링된 레시피 개수 및 결과 출력
print("=" * 50)
print(f"✅ 제외된 키워드를 포함하지 않은 레시피 개수: {len(filtered_recipes)} 개")
print("=" * 50)

# 상위 10개만 출력 (미리보기)
for recipe in filtered_recipes[:10]:  
    print(f"- {recipe['rcpNm']}")


# 상위 10개만 출력 (미리보기)
for recipe in filtered_recipes[:10]:  
    print(f"- {recipe['rcpNm']}")