## Overview

# You have been assigned with creating the primary REST service for a "Subscription as a Service" startup . Your REST service will be used by companies that will define subscriptions plans to which the users of the platform can subscribe to.


## Instructions
# General Instructions
    The submission will be evaluated for:
    Correctness
    Code Readability: Please write well formatted, readable code with appropriate variable naming

## Technical Instructions
# You MUST implement the API using Nodejs. You can use any framework on top of Node.
# You MUST use an RDBMS to store data (one of Postgres or MySQL). -> instead using mongoose as mentioned in the email.

## Submission
# Share the assignment as a link to git repo
# The git repo needs to track the commits you made as you solved the challenge. This is so that we can see how your code evolved.


## API Service
# The primary aspect of this programming challenge is to implement the following two APIs:
    /user
    /subscription

## The details of each of these APIs are as follows:
#    /user
    This is a simple CRUD API that adds a user to DB.
    PUT /user/
    creates a user with specified username in the DB
    GET /user/< username>

#    /subscription
    This is the primary API being tested in this challenge.
    This will need to provide mechanisms to:
    Register a new subscription for an existing user, with a specified plan and start date
    POST /subscription/
    GET /subscription/< username >/< date >

## handaling active subscriptions:-
    We could handle it in multiple ways:-
    1. Starting the next subscription when the current subscription ends.
    2. If we have multiple subscriptions then the active subscription will be the plan which is greater.