from apscheduler.schedulers.blocking import BlockingScheduler
from app.data_collection import update_all_places

scheduler = BlockingScheduler()

# Schedule the job to run every 5 minutes
scheduler.add_job(update_all_places, 'interval', minutes=10)

if __name__ == "__main__":
    print("Starting scheduled data collection...")