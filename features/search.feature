Feature: Buying tickets tests
    Scenario: should successfully buy for tomorrow 1st movie (1 ticket)
        Given user is on place choosing page for tomorrow "1" movie
        When user chooses one ticket at row "5" and place "6"
        Then user sees his tickets selected with notice "Вы выбрали билеты:", "5/6"
        
    Scenario: should successfully buy for aftertomorrow 2nd movie (3 tickets)
        Given user is on place choosing page for aftertomorrow "2" movie
        When user chooses three tickets at rows "5","5","5" and places "6","7","8"
        Then user sees his tickets selected with notice "Вы выбрали билеты:", "5/6, 5/7, 5/8"

    Scenario: should not buy if already bought (1 ticket)
        Given user is on place choosing page for tomorrow "2" movie
        When user chooses one ticket at row "7" and place "7"
        When user buys selected tickets 
        When user returns main page
        Given user is on place choosing page for tomorrow "2" movie
        When user chooses one ticket at row "7" and place "7"
        Then user can not buy tickets, button disabled