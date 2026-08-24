from sqlalchemy import text
from database import engine

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE"))
    conn.commit()
    
print("완료!")