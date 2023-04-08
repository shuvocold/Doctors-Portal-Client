import React from 'react';
import { Link } from 'react-router-dom';
import footerImage from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <div

            style={{
                backgroundImage: `url(${footerImage})`,
                backgroundSize: 'cover'
            }}
        >
            <footer className="footer p-10 ">
                <div>
                    <span className="footer-title">Services</span>
                    <Link to='/' className="link link-hover">Branding</Link>
                    <Link to='/' className="link link-hover">Design</Link>
                    <Link to='/' className="link link-hover">Marketing</Link>
                    <Link to='/' className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to='/' className="link link-hover">About us</Link>
                    <Link to='/' className="link link-hover">Contact</Link>
                    <Link to='/' className="link link-hover">Jobs</Link>
                    <Link to='/' className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link>
                    <Link className="link link-hover">Privacy policy</Link>
                    <Link className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <div >
                <p className='text-center mt-32 mb-4'>Copyright © 2022 - All right reserved</p>
            </div>
        </div>
    );
};

export default Footer;