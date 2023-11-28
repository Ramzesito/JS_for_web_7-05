# Feature: Search a course
#     Scenario: Should search by text
#         Given user is on "/navigation" page
#         When user search by "тестировщик"
#         Then user sees the course suggested "Тестировщик ПО"

Feature: Buying tickets tests
    Scenario: should successfully buy for tomorrow 1st movie (1 ticket)
        Given user is on place shoosing page for tomorrow "1" movie
        When user choose one ticket at "5" row, "6" place
        Then user sees his tickets selected with notice "Вы выбрали билеты:", "5/6"