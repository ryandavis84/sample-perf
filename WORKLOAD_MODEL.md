# Summary
With this psuedo service we need to be able to test its performance as well as its scalability.

## Assumptions
- The database will be a hosted solution that will scale to our use cases (e.g. RDS)
- The simulations that you write can be easily altered for new api's that are added to the service

## Performance Requirements
With 1 docker container we need to be able to handle at a minimum of:

(NOTE: During a retrieve method, if there is more than one page, assume the User will navigate all the way to the last
page)

### Workflow 1:
- 1 Partner
- 10 Customers under the same Partner
-- 5 Customers with 10 Endpoints
-- 4 Customers with 25 Endpoints
-- 1 Customer with 100 Endpoints
- Each Endpoint will generate events at a rate of 60 events every 2 minutes
- Each Customer will retrieve all events per endpoint every 10 minutes
- Each Partner will retrieve all events per customer every 30 minutes

### Workflow 2:
- 100 Partners
- Each Partner will have 2 customers
- Each Customer will have 1 endpoint
- Each Endpoint creates 10 events over 2 minutes
- Each Customer will retrieve all their events once a week
- Each Partner will retrieve all their events once a month

### Workflow 3
- Combine 5 Instances of Workflow 1
- Combine 1 Instance of Workflow 2

## SLA's
Each response should come back with in 1 second

## Scalability Requirements
Based on your findings of the Performance requirements, you should have a good idea of the scalability model and how it
may be done with AWS (Nothing needs to be deployed, and be completely hypothetical).

Using https://www.ec2instances.info/

- Come up with a strategy on how you may vertically scale the application to support 10x and 100x these workflows
- Come up with a strategy on how you would horizontally scale the application to support 10x and 100x these workflows
- Come up with a strategy that best utilizes an instance that can horizontally scale
- Given a growth pattern of 200% YoY, how would you come up with a scalability model that guarentees that this service
will be usable for the next 4 years.

## Questions

- What bottlenecks did you find?
- What data would you provide to validate your claim(s)?
- How would you resolve them?
- What other improvements would you make?
- What part of which flow has the highest standard deviation and why?
- What are the most important metrics that you observed in which flows?
- How would you present your findings to a Product Owner?







