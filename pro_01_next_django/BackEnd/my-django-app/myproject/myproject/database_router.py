class TALA_DatabaseRouter:
    def db_for_read(self, model, **hints):
        """Chỉ định database để đọc dữ liệu."""
        if model._meta.app_label == 'tala_app':
            return 'tala'
        return 'default'

    def db_for_write(self, model, **hints):
        """Chỉ định database để ghi dữ liệu."""
        if model._meta.app_label == 'tala_app':
            return 'tala'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """Cho phép quan hệ giữa các database."""
        db_set = {'default', 'tala'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Chỉ định database cho migration."""
        if app_label == 'tala_app':
            return db == 'tala'
        return db == 'default'
    
class PA_DatabaseRouter:
    def db_for_read(self, model, **hints):
        """Chỉ định database để đọc dữ liệu."""
        if model._meta.app_label == 'pa_app':
            return 'pa'
        return 'default'

    def db_for_write(self, model, **hints):
        """Chỉ định database để ghi dữ liệu."""
        if model._meta.app_label == 'pa_app':
            return 'pa'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """Cho phép quan hệ giữa các database."""
        db_set = {'default', 'pa'}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Chỉ định database cho migration."""
        if app_label == 'pa_app':
            return db == 'pa'
        return db == 'default'