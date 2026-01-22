import TextField from '../components/TextField';
import Button from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import AgeSlider from '../components/AgeSlider';
import Calendar from '../components/Calendar';
import { useTrainingForm } from '../hooks/useTrainingForm';
import { format, parseISO } from 'date-fns';
import TimeSlot from '../components/TimeSlot';
import { useToast } from '../context/ToastContext';

const AVAILABLE_TIMES = ['12:00', '14:00', '16:30', '18:30', '20:00'];

export default function BookingPage() {
  const {
    formData,
    updateField,
    submitApplication,
    isSubmitting,
    errors,
    handleBlur,
    isFormValid,
  } = useTrainingForm();

  const { showToast } = useToast();

  const handleSubmit = async () => {
    const success = await submitApplication();
    if (success) {
      showToast('Application sent successfully!', 'success');
    } else {
      showToast('Failed to send application. Please try again.', 'error');
    }
  };

  return (
    <div className="flex w-[426px] max-w-lg flex-col">
      <section className="flex flex-col gap-4">
        <h2 className="text-text-dark -translate-y-[2px] text-2xl font-medium">Personal info</h2>
        <div className="flex flex-col gap-5">
          <TextField
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            error={!!errors.firstName}
            errorMessage={errors.firstName}
          />
          <TextField
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            error={!!errors.lastName}
            errorMessage={errors.lastName}
          />
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={!!errors.email}
            errorMessage={errors.email}
          />

          <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-gray-600">Age</label>
            <AgeSlider value={formData.age} onChange={(val) => updateField('age', val)} />
          </div>

          <div className="mt-9 flex flex-col">
            <label className="text-md font-medium text-gray-600">Photo</label>
            <FileUpload onChange={(file) => updateField('file', file)} />
          </div>
        </div>
      </section>

      <section className="mt-10 flex flex-col gap-5">
        <h2 className="text-text-dark text-2xl font-medium">Your workout</h2>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-md font-medium text-gray-600">Date</label>
            <Calendar
              value={formData.date ? parseISO(formData.date) : undefined}
              onChange={(date) => {
                updateField('date', format(date, 'yyyy-MM-dd'));
                updateField('time', null);
              }}
            />
          </div>
          {formData.date && (
            <div className="animate-in fade-in slide-in-from-left-4 flex flex-1 flex-col gap-1 duration-500">
              <label className="text-md font-medium text-gray-600">Time</label>
              <div className="flex flex-col gap-3">
                {AVAILABLE_TIMES.map((time) => (
                  <TimeSlot
                    key={time}
                    time={time}
                    selected={formData.time === time}
                    onClick={() => updateField('time', time)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mt-5 pt-8">
        <Button onClick={handleSubmit} disabled={isSubmitting || !isFormValid}>
          {isSubmitting ? 'Sending...' : 'Send Application'}
        </Button>
      </div>
    </div>
  );
}
