import json

# 필터링할 키워드 리스트
keywords = [
    "밥", "국", "김치", "탕", "떡", "전", "된장", "나물", "죽", "찌개", "국수",
    "된장국", "순두부", "비빔밥", "깍두기", "청국장", "수제비", "미역국", "고추장", 
    "장아찌", "동치미", "쌈장", "삼계탕", "육개장", "칼국수", "북엇국", "열무김치", 
    "갈비탕", "콩나물국"
]

# JSON 파일 로드
file_path = "recipes.json"  # JSON 파일 경로를 입력하세요
with open(file_path, "r", encoding="utf-8") as file:
    recipes = json.load(file)

# 특정 키워드를 포함하는 레시피 필터링 함수
def filter_recipes_by_keywords(recipes, keywords):
    filtered_recipes = [
        recipe for recipe in recipes if any(keyword in recipe["rcpNm"] for keyword in keywords)
    ]
    return filtered_recipes

# 필터링 실행
filtered_recipes = filter_recipes_by_keywords(recipes, keywords)

# 결과 JSON 파일로 저장
output_file = "filtered_recipes.json"
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(filtered_recipes, file, ensure_ascii=False, indent=4)

# 필터링된 레시피 개수 및 결과 출력
print(f"필터링된 레시피 개수: {len(filtered_recipes)}")
for recipe in filtered_recipes[:10]:  # 상위 10개만 출력
    print(recipe["rcpNm"])


# 상위 10개만 출력 (미리보기)
for recipe in filtered_recipes[:10]:  
    print(f"- {recipe['rcpNm']}")