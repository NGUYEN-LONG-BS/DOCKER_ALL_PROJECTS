# Session cookie settings
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = False  # Đặt True nếu dùng HTTPS, False nếu chỉ phát triển nội bộ
SESSION_COOKIE_AGE = 3600  # 1 giờ
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-^2a&lr4l&k*7v^p508gw_8eb@5sv1hrpky27g8i&c&t4p+h2e6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    '172.16.0.4',
    '172.16.0.53',
]

# ALLOWED_HOSTS = ['*']  # Cho phép tất cả các máy con kết nối

# Nếu bạn muốn chỉ cho phép các IP cụ thể, thay thế '*' bằng danh sách IP:
# ALLOWED_HOSTS = ['192.168.1.100', '192.168.1.101']
# Mặc định, lệnh python manage.py runserver chỉ lắng nghe trên 127.0.0.1 (localhost). Máy con không thể kết nối qua địa chỉ này.


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Django REST Framework
    'corsheaders',  # CORS support
    'myapi',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS support
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Chỉnh sửa thành PostgreSQL
        'NAME': 'CONFIGURATION',  # Tên cơ sở dữ liệu PostgreSQL
        'USER': 'postgres',  # Tên người dùng PostgreSQL
        'PASSWORD': 'Ta#9999',  # Mật khẩu người dùng PostgreSQL
        'HOST': 'localhost',  # Máy chủ PostgreSQL (localhost nếu là máy cục bộ)
        'PORT': '5432',  # Cổng PostgreSQL (mặc định là 5432)
        'OPTIONS': {
            'options': '-c search_path=myconfiguration,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'tb': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'TBD_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'tala': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'TALA_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'pa': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'PA_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'hanoi': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'HANOI_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'mientay': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'MIENTAY_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    },
    'naman': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'NAMAN_2025',
        'USER': 'postgres',
        'PASSWORD': 'Ta#9999',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'options': '-c search_path=inventory,public'  # Chỉ định schema tìm kiếm trong DB
        }
    }
}

# LOGGING configuration
# ===========================================================================
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'django.db.backends': {
#             'level': 'DEBUG',
#             'handlers': ['console'],
#         },
#     },
# }
# ===========================================================================

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',    # Path to your static files directory
    ]  
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Directory where static files will be collected

MEDIA_URL = '/media/'  # URL prefix for accessing media files in the browser
MEDIA_ROOT = BASE_DIR / 'media'  # Absolute path to the 'media' directory

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True  # Cho phép tất cả các domain
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3101',        # Máy chủ Next.js trên cổng 3101
    'http://172.16.0.4:3101',      # IP LAN của máy con
    'http://172.16.0.53:3101', 
    'http://172.16.0.*:3101',  # Chỉ định mạng LAN
]

DATABASE_ROUTERS = [
    'myproject.database_router.TALA_DatabaseRouter',
    'myproject.database_router.PA_DatabaseRouter',
    'myproject.database_router.HANOI_DatabaseRouter',
    'myproject.database_router.MIENTAY_DatabaseRouter',
    'myproject.database_router.NAMAN_DatabaseRouter',
]

APPEND_SLASH = False