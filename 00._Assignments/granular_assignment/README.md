# README

Dette projekt er designet til at understøtte to roller: Exposer (den, der hoster databasen) og Integrator (den, der opretter forbindelse til databasen). Følg den vejledning, der passer til din rolle.


### For at intgrere med min database skal man gøre følgende (Integrator)
1) Kontakt mig (**Simon**) for at åbne forbindelsen til databasen, og spørg ham om korrekt ip-adresse og portnummer.
2) skriv i din terminal følgende: 

        psql -h 192.168.0.10 -p 5431 -U integrator -d fitnesscenter
    **ip-adressen og portnummer kan variere så afvent Simon's svar før i afprøver kommandoen**
3) Du bliver nu bedt om at skrive et password til brugeren "integrator", koden er "Redbull"
4) Prøv forskellige sql queries af. Du kan arbejde med tabellen "fitness_access", der har colonnerne "servicedesk", "weightliftingarea" og "spa"


### Oprettelse af sql databasen, og deploye til docker (Exposer)

1) Lav en init.sql der indeholder din database opsætning (kopier min).
2) Sørg for at have docker installeret på din Computer. Følg guiden på  <a href="www.docker.com">deres hjemmeside</a>.
3) Når din docker er installeret, kør dette i din terminal:

        docker pull postgres:latest
    Dette er kommandoen for at hente postgres ned, som vi bruger til din Docker container.

4) Efterfulgt af denne.

        docker run -d \
        --name my-postgres \
        -p 5431:5432 \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=fitnesscenter \
        -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql:ro \
        -v my_pgdata:/var/lib/postgresql/data \
        postgres:latest

5) Verificer at din docker container kører

        docker ps

6) Send følgende kommando med din rigtige ip-adresse og portnummer som du har konfigureret til din integrator:
        
        psql -h 192.168.0.10 -p 5431 -U integrator -d fitnesscenter