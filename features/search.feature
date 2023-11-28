# Feature: Search a course
#     Scenario: Should search by text
#         Given user is on "/navigation" page
#         When user search by "тестировщик"
#         Then user sees the course suggested "Тестировщик ПО"

Feature: Buying tickets tests
    Scenario: should successfully buy for tomorrow 1st movie (1 ticket)
        Given user is on place shoosing page for tomorrow "1" movie
        When user choose one ticket at row "5" and place "6"
        Then user sees his tickets selected with notice "Вы выбрали билеты:", "5/6"
        
    Scenario: should successfully buy for tomorrow 1st movie (1 ticket)
        Given user is on place shoosing page for tomorrow "2" movie
        When user choose one ticket at row "5" and place "6"
        Then user sees his tickets selected with notice "Вы выбрали билеты:", "5/6"