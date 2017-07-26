.PHONY: venv requirements server

venv:
	test -d venv || virtualenv-3.6 venv

venv-lint:
	test -d venv-lint || virtualenv-3.6 venv-lint

requirements: venv
	( \
		source venv/bin/activate; \
		pip install -r requirements.txt; \
	)

requirements-lint: venv-lint
	( \
		source venv/bin/activate; \
		pip install -r requirements.txt; \
		pip install -r requirements-lint.txt; \
	)

server: venv requirements
	( \
		source venv/bin/activate; \
		export FLASK_APP=lawfight; \
		export FLASK_DEBUG=1; \
		export FLASK_SECRET_KEY=DEV; \
		flask run; \
	)

lint: venv-lint requirements-lint
	( \
		source venv/bin/activate; \
		pylint **.py; \
		mypy --ignore-missing-imports **.py; \
	)