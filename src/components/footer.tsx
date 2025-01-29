import Link from 'next/link';
import Image from 'next/image';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';

export default function Footer() {
  const socialLinks = [
    { href: '#', label: 'Facebook', icon: BsFacebook },
    { href: '#', label: 'Twitter', icon: BsTwitter },
    { href: '#', label: 'Instagram', icon: BsInstagram },
    { href: '#', label: 'LinkedIn', icon: BsLinkedin },
  ];

  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { href: '/profile', label: 'My Account' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/about', label: 'About Us' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  return (
    <footer className="bg-blackish text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/assets/upl-removebg-preview.png"
              width={100}
              height={100}
              alt="GlamUp Logo"
              className="mb-4"
              priority
            />
            <h2 className="text-2xl text-accent pl-1 font-bold mb-4">Elegencia</h2>
            <p className="text-gray-400 mb-4">
              A trendy website for the latest in fashion, featuring curated collections and a seamless shopping experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-300 hover:text-accent transition"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Footer Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <nav className="space-y-2">
                {links.map(({ href, label }) => (
                  <Link key={label} href={href} className="block text-gray-400 hover:text-white">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 w-full rounded-md text-black"
                aria-label="Enter your email"
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-accent px-4 py-2 rounded-md text-blackish transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-8 pt-6 text-center">
          <p className="text-white">
            © {new Date().getFullYear()} Elegencia All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
