import './Footer.css';
import logoImage from '../assets/logo.png';
import githubIcon from '../assets/github.png';
import classroomLogo from '../assets/classroomLogo.png';
import assignmentLogo from '../assets/assignmentLogo.png';
import emailLogo from '../assets/emailLogo.png'

function Footer() {

    return (
        <div className='footer' id='footer'>
            <div className="title">
                <h1>Stream City</h1>
                <img className="logo-image" src={logoImage} alt="Logo Image" />
            </div>
            <div className="footer-columns">
                <div className='links'>
                    <div className='link-row'>
                        <p>Github</p>
                        <a href="https://github.com/Jeffery0000/summative" target="_blank">
                            <img className="github-icon" src={githubIcon} alt="github icon" />
                        </a>
                    </div>
                    <div className='link-row'>
                        <p>Classroom</p>
                        <a href="https://classroom.google.com/u/1/c/NzQ3OTAzODQ0Mzcz" target="_blank">
                            <img className="classroom-logo" src={classroomLogo} alt="classroom logo" />
                        </a>
                    </div>
                    <div className='link-row'>
                        <p>Assignment page</p>
                        <a href="https://classroom.google.com/c/NzQ3OTAzODQ0Mzcz/a/Nzc4NjY0NTY2MTQx/details" target="_blank">
                            <img className="assignment-logo" src={assignmentLogo} alt="assignment Logo" />
                        </a>
                    </div>
                </div>
                <div className='contacts'>
                    <div className="contact-row">
                        <p>Email</p>
                        <a target="_blank" href="jeffery.lin@student.tdsb.on.ca">
                            <img className="email-logo" src={emailLogo} alt="email logo" />
                        </a>
                    </div>
                    <div className="contact-row">
                        <p>Phone: 123-321-4567</p>
                    </div>
                </div>
            </div>
            <p className="copywrite">&copy; 2025 Stream City</p>
        </div>
    );
}

export default Footer;