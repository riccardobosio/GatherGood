"""
This module contains Django settings for config project splitted in different files.
"""

from pathlib import Path

from environ import Env

# Build paths inside the project like this: BASE_DIR / 'subdir'.

# Loading `.env` files
env = Env()
env.read_env()
