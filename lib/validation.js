/**
 * Validation rules for all forms across the application
 * Used with React Hook Form
 */

export const formValidationRules = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name is too long (max 100 characters)' },
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message: 'Name contains invalid characters',
    },
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
    maxLength: { value: 254, message: 'Email is too long' },
  },

  phone: {
    pattern: {
      value: /^[+]?[0-9\s\-()]+$/,
      message: 'Please enter a valid phone number',
    },
    minLength: { value: 10, message: 'Phone number must be at least 10 characters' },
    maxLength: { value: 20, message: 'Phone number is too long' },
  },

  subject: {
    required: 'Subject is required',
    minLength: { value: 5, message: 'Subject must be at least 5 characters' },
    maxLength: { value: 200, message: 'Subject is too long (max 200 characters)' },
  },

  message: {
    required: 'Message is required',
    minLength: { value: 10, message: 'Message must be at least 10 characters' },
    maxLength: { value: 5000, message: 'Message is too long (max 5000 characters)' },
  },

  position: {
    required: 'Please select a position',
  },

  experience: {
    required: 'Years of experience is required',
    min: { value: 0, message: 'Experience cannot be negative' },
    max: { value: 70, message: 'Please enter a realistic experience value' },
  },

  coverLetter: {
    minLength: { value: 50, message: 'Cover letter must be at least 50 characters' },
    maxLength: { value: 2000, message: 'Cover letter is too long (max 2000 characters)' },
  },

  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name is too long' },
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message: 'Name contains invalid characters',
    },
  },

  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase, and numbers',
    },
  },
};

/**
 * Helper function to get sanitized form data
 * Prevents XSS by trimming and escaping user input
 */
export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Trim whitespace and escape HTML special characters
      sanitized[key] = value
        .trim()
        .replace(/[&<>"']/g, (char) => {
          const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
          };
          return escapeMap[char];
        });
    } else if (typeof value === 'number') {
      sanitized[key] = value;
    } else if (value !== null && value !== undefined) {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Validate email format (stricter RFC compliance)
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]{1,64}@[^\s.][^\s@]{0,63}[^\s@]$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate phone number (international format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) || digitsOnly.length >= 10;
};

/**
 * Get error message for a specific field
 */
export const getFieldError = (fieldName, error) => {
  if (!error) return null;
  return error.message || `${fieldName} is invalid`;
};
