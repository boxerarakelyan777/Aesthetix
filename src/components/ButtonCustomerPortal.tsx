'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

// Customer portal link
const customerPortalLink =
    'https://billing.stripe.com/p/login/14k29f85Gg0j4o0144';

const ButtonCustomerPortal = () => {
    const { isSignedIn, user } = useUser();

    if (isSignedIn && user) {
        return (
            <motion.a
                href={`${customerPortalLink}?prefilled_email=${user.primaryEmailAddress?.emailAddress}`}
                className="px-6 py-2 bg-gradient-to-r from-royal-purple to-electric-cyan text-soft-white rounded-full hover:shadow-glow transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
            >
                Billing
            </motion.a>
        );
    }

    return null; // We'll handle the sign-in button separately in the Navbar
};

export default ButtonCustomerPortal;