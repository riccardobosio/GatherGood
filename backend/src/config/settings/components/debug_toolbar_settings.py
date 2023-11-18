"""
This module contains Django database settings:
https://docs.djangoproject.com/en/4.2/ref/settings/#databases
"""
from config.settings.components import env

DEBUG: bool = env.bool('DEBUG', default=True)

if DEBUG:
    from typing import Callable, Dict, Tuple

    from django.http import HttpRequest


    def show_toolbar(request: HttpRequest) -> bool:
        return True


    DEBUG_TOOLBAR_CONFIG: Dict[str, Callable] = {
        "SHOW_TOOLBAR_CALLBACK": show_toolbar
    }
    PANELS: str = "debug_toolbar.panels."
    DEBUG_TOOLBAR_PANELS: Tuple[str, ...] = (
        f"{PANELS}versions.VersionsPanel",
        f"{PANELS}timer.TimerPanel",
        f"{PANELS}settings.SettingsPanel",
        f"{PANELS}headers.HeadersPanel",
        f"{PANELS}request.RequestPanel",
        f"{PANELS}redirects.RedirectsPanel",
        f"{PANELS}staticfiles.StaticFilesPanel",
        f"{PANELS}sql.SQLPanel",
        f"{PANELS}templates.TemplatesPanel",
        f"{PANELS}cache.CachePanel",
        f"{PANELS}signals.SignalsPanel",
        f"{PANELS}logging.LoggingPanel",
    )
