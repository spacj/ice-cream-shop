'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * Google Maps Embed Component
 * Displays an embedded Google Map with location marker
 */
export function GoogleMapEmbed({ 
  location = 'Pistacchio, Sicily, Italy',
  latitude = 37.5,
  longitude = 13.5,
  zoom = 15,
  title = 'Visit Our Shop'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden shadow-xl"
    >
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.7522${latitude}!2d${longitude}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPistacchio!5e0!3m2!1sen!2sus!4v${new Date().getTime()}`}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </motion.div>
  );
}

/**
 * Location Card Component
 * Shows address, hours, phone with animated details
 */
export function LocationCard({ 
  address = 'Via Roma 123, Palermo, Sicily 90100',
  phone = '+39 091 123 4567',
  email = 'hello@pistacchio.it',
  hours = {
    weekday: '10:00 AM - 10:00 PM',
    weekend: '10:00 AM - 11:00 PM'
  }
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-8 border border-red-200"
    >
          <h3 className="font-display text-3xl text-dark mb-8">Visit Us</h3>
      
      {/* Address */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex gap-4 items-start">
          <div className="text-3xl">📍</div>
          <div>
            <h4 className="font-semibold text-dark mb-2">Our Location</h4>
            <p className="text-dark">{address}</p>
          </div>
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex gap-4 items-start">
          <div className="text-3xl">📞</div>
          <div>
            <h4 className="font-semibold text-dark mb-2">Call Us</h4>
            <a href={`tel:${phone}`} className="text-red-600 hover:text-red-700 font-medium">
              {phone}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex gap-4 items-start">
          <div className="text-3xl">✉️</div>
          <div>
            <h4 className="font-semibold text-dark mb-2">Email Us</h4>
            <a href={`mailto:${email}`} className="text-red-600 hover:text-red-700 font-medium">
              {email}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Hours */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="flex gap-4 items-start">
          <div className="text-3xl">🕐</div>
          <div>
            <h4 className="font-semibold text-dark mb-2">Opening Hours</h4>
            <p className="text-dark mb-1">Monday - Friday: {hours.weekday}</p>
            <p className="text-dark">Saturday - Sunday: {hours.weekend}</p>
          </div>
        </div>
      </motion.div>

      {/* Directions Button */}
      <motion.a
        href="https://www.google.com/maps/search/Pistacchio+Sicily"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block mt-8 px-6 py-3 bg-gradient-red text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
      >
        Get Directions →
      </motion.a>
    </motion.div>
  );
}

/**
 * Google Rating Display
 * Shows star rating and review count
 */
export function GoogleRating({ 
  rating = 4.8, 
  reviewCount = 246,
  business = 'Pistacchio'
}) {
  const stars = Math.round(rating * 2) / 2; // Round to nearest 0.5

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, rotate: -180 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`text-3xl ${
              i < Math.floor(rating) 
                ? 'text-yellow-400' 
                : i < Math.ceil(rating)
                ? 'text-yellow-300'
                : 'text-gray-300'
            }`}
          >
            ★
          </motion.span>
        ))}
      </div>
      <p className="text-3xl font-display text-red-600 mb-2">{rating}</p>
      <a
        href="https://www.google.com/search?q=Pistacchio+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="text-taupe hover:text-red-600 transition-colors"
      >
        {reviewCount} Google Reviews →
      </a>
    </motion.div>
  );
}

/**
 * Review Card Component
 * Individual review display
 */
export function ReviewCard({ 
  author = 'Customer Name',
  rating = 5,
  text = 'Amazing gelato! Best pistachio I have ever tasted!',
  date = 'Last month',
  verified = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6 border border-red-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-dark flex items-center gap-2">
            {author}
            {verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified</span>}
          </h4>
          <p className="text-sm text-taupe">{date}</p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-dark leading-relaxed italic">"{text}"</p>
    </motion.div>
  );
}

/**
 * Reviews Section with Google Reviews Grid
 */
export function ReviewsSection({ 
  reviews = [],
  googleRating = 4.8,
  reviewCount = 246
}) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl text-red-600 mb-4">
            Love from Our Customers
          </h2>
          <p className="text-lg text-taupe max-w-2xl mx-auto">
            Join thousands of satisfied customers who have experienced authentic Sicilian pistachio
          </p>
        </motion.div>

        {/* Google Rating Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 glass rounded-3xl p-12 border border-red-200 text-center"
        >
          <p className="text-lg text-dark mb-4">Rated on</p>
          <div className="text-4xl mb-6">🔍</div>
          <div className="flex items-center justify-center gap-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-4xl text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-5xl font-display text-red-600 mb-2">{googleRating}</p>
          <p className="text-taupe text-lg">
            Based on {reviewCount} Google Reviews
          </p>
          <motion.a
            href="https://www.google.com/search?q=Pistacchio+reviews"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-6 px-8 py-3 bg-gradient-red text-white rounded-full font-semibold"
          >
            Read All Reviews on Google →
          </motion.a>
        </motion.div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/**
 * Contact & Location Section
 * Complete section with map and contact info
 */
export function LocationSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl text-red-600 mb-4">
            Find Us
          </h2>
          <p className="text-lg text-dark max-w-2xl mx-auto">
            Visit our shop in the heart of Palermo and experience authentic Sicilian gelato
          </p>
        </motion.div>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <GoogleMapEmbed />
          </motion.div>

          {/* Contact Info */}
          <LocationCard />
        </div>
      </div>
    </section>
  );
}
