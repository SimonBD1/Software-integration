CREATE TABLE IF NOT EXISTS fitness_access (
    id SERIAL PRIMARY KEY,
    servicedesk TEXT,
    weightliftingarea TEXT,
    spa TEXT
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_roles
        WHERE rolname = 'integrator'
    ) THEN
        CREATE ROLE integrator WITH LOGIN PASSWORD 'redbull';
    END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO integrator;

REVOKE ALL ON TABLE fitness_access FROM integrator;

INSERT INTO fitness_access (servicedesk, weightliftingarea, spa)
VALUES ('Hey velkommen til', 'Bare løft min ven', 'Nyd livet champ');

GRANT SELECT (id, servicedesk, weightliftingarea)
ON TABLE fitness_access
TO integrator;

REVOKE SELECT (spa) ON TABLE fitness_access FROM integrator;

GRANT INSERT (servicedesk) ON TABLE fitness_access TO integrator;
GRANT UPDATE (servicedesk) ON TABLE fitness_access TO integrator;
