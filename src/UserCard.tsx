import React from 'react';

export interface UserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  university: string;
  company: { title: string };
}

const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  email,
  phone,
  image,
  university,
  company,
}) => {
  return (
    <article className="user-card" tabIndex={0} aria-label={`User card for ${firstName} ${lastName}`}
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '1px solid #eee', borderRadius: 8, marginBottom: 12 }}
    >
      <img src={image} alt={`${firstName} ${lastName}`} width={64} height={64} style={{ borderRadius: '50%' }} />
      <div>
        <h2 style={{ margin: 0, fontSize: 20 }}>{firstName} {lastName}</h2>
        <p style={{ margin: '4px 0' }}>{company?.title} at {university}</p>
        <p style={{ margin: '4px 0' }}><a href={`mailto:${email}`}>{email}</a></p>
        <p style={{ margin: '4px 0' }}>{phone}</p>
      </div>
    </article>
  );
};

export default UserCard; 