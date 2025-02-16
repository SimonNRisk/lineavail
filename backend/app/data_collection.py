import os
import json
import datetime
from dotenv import load_dotenv
from app.database import SessionLocal, init_db
from app.models import PopularTimes
from LivePopularTimes.livepopulartimes import get_populartimes_by_PlaceID
import time 

init_db()
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def update_place_data(place_id: str):
    """
    Fetch the latest data for a given place and update or insert it into the database.
    """
    data = get_populartimes_by_PlaceID(GOOGLE_API_KEY, place_id)
    
    if not data:
        print("No data fetched for this place.")
        return
    

    session = SessionLocal()
    
    populartimes_json = json.dumps(data.get("populartimes", {}))

    hours_json = json.dumps(data.get("hours", None))

    # check if place already exists
    existing_place = session.query(PopularTimes).filter_by(place_id=data["place_id"]).first()

    if existing_place:
        existing_place.populartimes = populartimes_json
        existing_place.current_popularity = data.get("current_popularity", None)
        existing_place.last_updated = datetime.datetime.utcnow()
        print(f"Data for {existing_place.name} updated in the database.")
    else:
        new_place = PopularTimes(
            name=data["name"],
            place_id=data["place_id"],
            address=data["address"],
            hours=hours_json,
            populartimes=populartimes_json,
            current_popularity=data.get("current_popularity", None),
        )
        session.add(new_place)
        print(f"Data for {new_place.name} updated.")

    session.commit()
    session.close()
    

PLACE_IDS = [
    "ChIJtazvfASr0kwRZGzhEO5oz0M",  # Douglas
    "ChIJD26wpQar0kwR8X7AfzpJHr0",  # ARC
    "ChIJ3VWIHBur0kwRd9Cvmx70Fis",  # Loco
    "ChIJy9YaKwWr0kwRhIDktu6CyxY",   # Lazy
    "ChIJtymSWwer0kwRgp1RSlE2obo",   # Brass
    "ChIJwxdETQer0kwRnHOWYjaTiIQ"   # Stages
]

def update_all_places():
    for pid in PLACE_IDS:
        update_place_data(pid)

if __name__ == "__main__":
    update_all_places()


# tester print
# session = SessionLocal()

# douglas = session.query(PopularTimes).filter_by(name="Douglas Library").first()

# if douglas:
#     print(f"{douglas.name} Popular Times:")
#     print(douglas.populartimes) 
# else:
#     print("Douglas Library not found")

# session.close()
