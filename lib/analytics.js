/**
 * Analytics and Tracking Utilities
 * Integrates with Google Analytics, Firebase Analytics, etc.
 */

/**
 * Initialize Google Analytics
 */
export function initGoogleAnalytics(measurementId) {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', measurementId);

  return gtag;
}

/**
 * Track page view
 */
export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track custom event
 */
export function trackEvent(eventName, eventData) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, eventData);
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName, formData) {
  trackEvent('form_submission', {
    form_name: formName,
    form_fields: Object.keys(formData).length,
  });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName, buttonCategory = 'button') {
  trackEvent('button_click', {
    button_name: buttonName,
    button_category: buttonCategory,
  });
}

/**
 * Track product view (flavor)
 */
export function trackProductView(productName, productCategory) {
  trackEvent('view_item', {
    items: [{
      item_name: productName,
      item_category: productCategory,
      item_brand: 'Gelato Luxe',
    }],
  });
}

/**
 * Firebase Analytics setup
 */
export function initFirebaseAnalytics(analytics) {
  if (!analytics) return;

  // Firebase analytics is automatically enabled
  return analytics;
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  static metrics = {
    pageLoadTime: null,
    timeToInteractive: null,
    firstContentfulPaint: null,
    largestContentfulPaint: null,
  };

  static initialize() {
    if (typeof window === 'undefined') return;

    // Measure page load time
    window.addEventListener('load', () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        this.metrics.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      }
    });

    // Use Web Vitals API
    if ('PerformanceObserver' in window) {
      this.observeMetrics();
    }
  }

  static observeMetrics() {
    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        this.metrics.firstContentfulPaint = entries[0].startTime;
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.log('FCP observer not supported');
    }
  }

  static getMetrics() {
    return this.metrics;
  }

  static reportMetrics() {
    console.log('Performance Metrics:', this.metrics);
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      trackEvent('performance_metrics', {
        page_load_time: this.metrics.pageLoadTime,
        lcp: this.metrics.largestContentfulPaint,
        fcp: this.metrics.firstContentfulPaint,
      });
    }
  }
}

/**
 * Error tracking
 */
export class ErrorTracker {
  static initialize() {
    if (typeof window === 'undefined') return;

    // Track uncaught errors
    window.addEventListener('error', (event) => {
      this.trackError(
        event.message,
        event.filename,
        event.lineno,
        event.colno,
        'uncaught_error'
      );
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(
        event.reason?.message || 'Unhandled Promise Rejection',
        'promise',
        0,
        0,
        'unhandled_rejection'
      );
    });
  }

  static trackError(message, source, lineno, colno, errorType) {
    console.error(`[${errorType}] ${message}`);

    if (typeof window !== 'undefined' && window.gtag) {
      trackEvent('error', {
        error_message: message,
        error_source: source,
        error_line: lineno,
        error_column: colno,
        error_type: errorType,
      });
    }
  }
}

/**
 * Session tracking
 */
export class SessionTracker {
  static sessionId = null;
  static sessionStartTime = null;

  static initialize() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = new Date();

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.trackSessionEnd();
      });
    }
  }

  static generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static trackSessionEnd() {
    const sessionDuration = new Date() - this.sessionStartTime;
    
    if (typeof window !== 'undefined' && window.gtag) {
      trackEvent('session_end', {
        session_id: this.sessionId,
        session_duration: Math.round(sessionDuration / 1000),
      });
    }
  }

  static getSessionId() {
    return this.sessionId;
  }
}

/**
 * User interaction tracking
 */
export function trackUserInteraction(interactionType, details) {
  trackEvent('user_interaction', {
    interaction_type: interactionType,
    ...details,
  });
}

/**
 * Conversion tracking
 */
export function trackConversion(conversionType, conversionValue) {
  trackEvent('conversion', {
    conversion_type: conversionType,
    conversion_value: conversionValue,
  });
}

/**
 * Initialize all tracking
 */
export function initializeTracking(config) {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics if ID provided
  if (config.googleAnalyticsId) {
    initGoogleAnalytics(config.googleAnalyticsId);
  }

  // Initialize performance monitoring
  PerformanceMonitor.initialize();
  PerformanceMonitor.reportMetrics();

  // Initialize error tracking
  ErrorTracker.initialize();

  // Initialize session tracking
  SessionTracker.initialize();
}

/**
 * Analytics dashboard metrics
 */
export const analyticsMetrics = {
  pageViews: 0,
  uniqueUsers: 0,
  averageSessionDuration: 0,
  bounceRate: 0,
  conversionRate: 0,
  topPages: [],
  trafficSources: [],
};
