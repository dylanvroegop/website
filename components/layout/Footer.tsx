"use client";

import Link from "next/link";
import { siteCopy } from "@/content/copy";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const { footer } = siteCopy;
  const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {footer.product.title}
            </h3>
            <ul className="space-y-3">
              {footer.product.links.map((link) => (
                <li key={link.label}>
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {footer.modules.title}
            </h3>
            <ul className="space-y-3">
              {footer.modules.links.map((link) => (
                <li key={link.label}>
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {footer.support.title}
            </h3>
            <ul className="space-y-3">
              {footer.support.links.map((link) => (
                <li key={link.label}>
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {footer.company.title}
            </h3>
            <ul className="space-y-3">
              {footer.company.links.map((link) => (
                <li key={link.label}>
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex flex-col select-none group no-underline hover:opacity-90 transition-opacity">
              <BrandLogo size="footer" />
            </Link>
            <span className="text-sm text-gray-500">{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
