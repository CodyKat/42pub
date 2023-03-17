from pub import db


def upload_all(*args):
    db.session.add_all([to_upload for to_upload in args])
    db.session.commi()

def upload(to_upload):
    db.session.add(to_upload)
    db.session.commit()

def delete(to_delete):
    db.session.delete(to_delete)
    db.session.commit()