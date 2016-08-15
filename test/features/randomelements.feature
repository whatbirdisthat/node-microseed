Feature: API generates a random sequence of IDs
  As a marketer
  I want to display a random selection of questions from a large list
  So I can reduce the burden on users by limiting the number of questions

  Scenario: Request a 10-digit random sequence
    Given I request a random sequence of non-repeating numbers
    When The sequence is generated
    Then The sequence has no repeated numbers and is 10 digits long

