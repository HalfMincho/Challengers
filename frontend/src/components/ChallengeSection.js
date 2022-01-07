import React from 'react';
import styled from 'styled-components';
import ChallengeCard from './ChallengeCard';

const ChallengeInfo = [
  {
    id: 3,
    submitter: 'd29ad77b-63f1-4885-8fdb-a3fa709d8801',
    category: 'd29ad77b-63f1-4885-8fdb-a3fa709d8801',
    name: 'name33232',
    auth_way: 2,
    auth_day: '0000010',
    auth_count_in_day: 2,
    start_at: '2021-11-30 18:22:33',
    end_at: '2021-11-30 18:22:33',
    cost: 13000,
    description: 'description123',
    reg_date: '2021-11-30 18:22:33',
    views: 5,
  },
  {
    id: 1,
    submitter: '66374b90-6eb5-459a-b54e-488268c99e13',
    category: '66374b90-6eb5-459a-b54e-488268c99e13',
    name: 'name33232',
    auth_way: 2,
    auth_day: '0000010',
    auth_count_in_day: 2,
    start_at: '2021-11-30 15:09:22',
    end_at: '2021-11-30 15:09:22',
    cost: 13000,
    description: 'description123',
    reg_date: '2021-11-30 15:09:22',
    views: 4,
  },
  {
    id: 5,
    submitter: '0adb789d-4089-4f0e-bd23-e70fe77e6b0f',
    category: '0adb789d-4089-4f0e-bd23-e70fe77e6b0f',
    name: 'name33232',
    auth_way: 2,
    auth_day: '0000010',
    auth_count_in_day: 2,
    start_at: '2022-01-06 08:02:19',
    end_at: '2022-01-06 08:02:19',
    cost: 13000,
    description: 'description123',
    reg_date: '2022-01-06 08:02:19',
    views: 1,
  },
  {
    id: 6,
    submitter: '9c6d8bf6-f2ab-4676-bbeb-8c7fcd9b0f9b',
    category: '9c6d8bf6-f2ab-4676-bbeb-8c7fcd9b0f9b',
    name: 'name33232',
    auth_way: 2,
    auth_day: '0000010',
    auth_count_in_day: 2,
    start_at: '2022-01-07 00:53:13',
    end_at: '2022-01-07 00:53:13',
    cost: 13000,
    description: 'description123',
    reg_date: '2022-01-07 00:53:13',
    views: 1,
  },
];

const Section = styled.div`
  margin: 5% 0;

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15px;

    .sectionTitle {
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  .cardContainer {
    display: flex;
    justify-content: space-between;
  }
`;

// const showChallengeFragment = (number) => {}

const ChallengeSection = ({ number, title }) => {
  return (
    <>
      <Section>
        <p className="sectionHeader">
          <span className="sectionTitle">{title}</span>
          <span>더보기</span>
        </p>
        <div className="cardContainer">
          {/* number개 만큼 ChallengeCard map / Challenge Info에 맞춰서 */}
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
          <ChallengeCard />
        </div>
      </Section>
    </>
  );
};

export default ChallengeSection;
