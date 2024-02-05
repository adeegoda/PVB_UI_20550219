import React, { useState, Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardMeta,
  Divider,
  Image,
  Placeholder,
  PlaceholderHeader,
  PlaceholderImage,
  PlaceholderLine,
  PlaceholderParagraph,
} from 'semantic-ui-react';

const cards = [
  {
    avatar: '/images/avatar/large/helen.jpg',
    date: 'Joined in 2013',
    header: 'Helen',
    description: 'Primary Contact',
  },
  {
    avatar: '/images/avatar/large/matthew.png',
    date: 'Joined in 2013',
    header: 'Matthew',
    description: 'Primary Contact',
  },
  {
    avatar: '/images/avatar/large/molly.png',
    date: 'Joined in 2013',
    header: 'Molly',
    description: 'Primary Contact',
  },
]

const VotingUI = () => {
  const [loading, setLoading] = useState(false);
  const handleLoadingClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }

  return <>
    <Button loading={loading} onClick={handleLoadingClick} primary>
      Simulate loading
    </Button>
    <Divider />

    <CardGroup doubling itemsPerRow={3} stackable>
      {_.map(cards, (card) => (
        <Card key={card.header}>
          {loading ? (
            <Placeholder>
              <PlaceholderImage square />
            </Placeholder>
          ) : (
            <Image src={card.avatar} />
          )}

          <CardContent>
            {loading ? (
              <Placeholder>
                <PlaceholderHeader>
                  <PlaceholderLine length='very short' />
                  <PlaceholderLine length='medium' />
                </PlaceholderHeader>
                <PlaceholderParagraph>
                  <PlaceholderLine length='short' />
                </PlaceholderParagraph>
              </Placeholder>
            ) : (
              <>
                <CardHeader>{card.header}</CardHeader>
                <CardMeta>{card.date}</CardMeta>
                <CardDescription>{card.description}</CardDescription>
              </>
            )}
          </CardContent>

          <CardContent extra>
            <Button disabled={loading} primary>
              Add
            </Button>
            <Button disabled={loading}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </CardGroup>
  </>
};

render(<VotingUI />, document.querySelector('#root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

