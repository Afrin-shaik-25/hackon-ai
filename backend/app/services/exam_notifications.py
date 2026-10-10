import uuid
from datetime import datetime, date, timedelta
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.student import StudentExam, ExamNotification

class ExamNotificationService:
    @staticmethod
    def calculate_days_remaining(exam_date_str: str) -> int:
        try:
            today = date.today()
            exam_date = datetime.strptime(exam_date_str, "%Y-%m-%d").date()
            diff = (exam_date - today).days
            return max(0, diff)
        except Exception:
            return 0

    @classmethod
    def prepare_5_day_reminders(
        cls,
        db: Session,
        exam: StudentExam
    ) -> List[ExamNotification]:
        """
        Prepares 5 daily morning reminders (8:00 AM) prior to the exam date.
        Prevents duplicate reminder scheduling.
        """
        try:
            exam_dt = datetime.strptime(exam.exam_date, "%Y-%m-%d")
        except Exception:
            return []

        created_notifications = []

        # Days before: 5, 4, 3, 2, 1
        for days in range(5, 0, -1):
            reminder_dt = (exam_dt - timedelta(days=days)).replace(hour=8, minute=0, second=0)
            scheduled_str = reminder_dt.strftime("%Y-%m-%d %H:%M")

            # Check for existing notification to avoid duplicates
            existing = db.query(ExamNotification).filter(
                ExamNotification.exam_id == exam.id,
                ExamNotification.days_before == days
            ).first()

            if not existing:
                notification = ExamNotification(
                    id=f"notif-{uuid.uuid4().hex[:8]}",
                    exam_id=exam.id,
                    student_id=exam.student_id,
                    scheduled_for=scheduled_str,
                    status="Scheduled (Ready)",
                    channel="Email & Push (Simulated Dispatch)",
                    message=f"Reminder: Your upcoming exam in '{exam.subject_name}' ({exam.subject_code}) is in {days} day{'s' if days > 1 else ''} on {exam.exam_date} at {exam.exam_time} ({exam.venue}).",
                    days_before=days
                )
                db.add(notification)
                created_notifications.append(notification)

        if created_notifications:
            db.commit()

        return created_notifications

    @staticmethod
    def get_delivery_infrastructure_status() -> Dict[str, Any]:
        return {
            "email_provider_configured": False,
            "sms_fcm_provider_configured": False,
            "scheduler_status": "Internal database queue active; external dispatch provider (SMTP/Twilio/FCM) not connected.",
            "mode": "Demonstration Scheduled Records"
        }
