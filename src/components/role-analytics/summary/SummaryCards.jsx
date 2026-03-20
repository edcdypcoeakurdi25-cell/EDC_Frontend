import Cards from './Cards.jsx';

export default function SummaryCards({ applications = [] }) {
    const names = applications.map(r => r.name).filter(Boolean);
    const year_of_study = applications.map(r => r.yearOfStudy).filter(Boolean);
    const phone_number = applications.map(r => r.phoneNumber).filter(Boolean);
    const email = applications.map(r => r.email).filter(Boolean);
    const branch = applications.map(r => r.branch).filter(Boolean);
    const prior_exp = applications.map(r => r.priorExperience).filter(Boolean);

    return (
        <>
            <Cards title="Enter your Name" items={names} />
            <Cards title="Choose Year of Study" items={year_of_study} />
            <Cards title="Enter your Phone Number" items={phone_number} />
            <Cards title="Enter your Email Address" items={email} />
            <Cards title="Select your Branch" items={branch} />
            <Cards
                title="Do you have any prior experience working in Operations?"
                items={prior_exp}
            />
        </>
    );
}
