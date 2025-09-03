'use client';

import { School, Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <School className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SchoolHub</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Streamlining educational institution management with modern technology and intuitive design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/addSchool" className="text-gray-400 hover:text-white transition-colors">
                  Add School
                </a>
              </li>
              <li>
                <a href="/showSchools" className="text-gray-400 hover:text-white transition-colors">
                  Browse Schools
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="text-gray-400 space-y-2">
              <p>Email: info@schoolhub.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SchoolHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}