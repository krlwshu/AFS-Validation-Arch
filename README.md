AFS Microservices

Simulation of multi-region version. No integration configured, other than basic shared_network settings to run and enhance on docker.

# 2 x 

  ## Backend services (node js, express mvc)
  - **workflow service** - provides workflow management, steps, application forms
  - **applicant service** - serves as backend to applicant front end, stores instances of application data, refernces workflow id
  - **branch service** - serves as backend for branch clerk. Accesses applicant events in scope of branch
  - **auth service** - provides interfaces for the management of RBAC configuration. Users, roles, regions etc.
  - **visa auth service** - stores information regarding visa types, eligibility, and interfaces with outbound systems, such as API gateway where transforming of payloads into Visa Authority format takes place
  - **admin service** - interfaces with all configurational aspects of the system, defines regions
  
  ## Databases (all mongodb)
  
  Each database is couple with the main service:
  
  - applicant service db (stores application data)
  - auth service db (stores user access data)
  - branch service db (stores branch actions data)
  - workflow service db (stores workflow settings and workflow instances)
  - admin service db (stores administrative settings such as configuration for regional data)
  
  ## Web applications
  
  - web app applicant (react js app that interacts with applicant service
  - web app branch (react js app that interacts with branch service
  - web app admin (react js app that interacts with the admin service)
  
  ## Kafka events
  
  for interaction between different services through events such as the triggering of workflows steps, notifying other services, posting events for OSS system to ingest (i.e. Grafana etc.)
  
  - kafka service (servces as a message broker for consumers/producers to access topics)
  - kafka ui (testing tool to visualize kafka messages etc.)

# 1 x NGINX proxy
