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
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/NPP_Symbol.png/100px-NPP_Symbol.png',
    header1: "ජාතික ජන බලවේගය",
    header2: "National People's Power",
    header3: "தேசிய மக்கள் சக்தி",
    
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png/180px-Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png',
    header1: "සමගි ජනබලවේගය",
    header2: "Samagi Jana Balawegaya",
    header3: "ஐக்கிய மக்கள் சக்தி",
  },
  {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sri_Lanka_Podujana_Peramuna_election_symbol.svg/125px-Sri_Lanka_Podujana_Peramuna_election_symbol.svg.png',
    header1: "ශ්‍රී ලංකා පොදුජන පෙරමුණ",
    header2: "Sri Lanka Podujana Peramuna ",
    header3: "இலங்கை பொதுஜன முன்னணி",
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
      Refresh | නැවුම් කරන්න | புதுப்பிப்பு 
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
            <Image src={card.avatar} style={{ height: 100, width: 100 }} />
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
                <CardHeader>{card.header1}</CardHeader>
                <CardHeader>{card.header2}</CardHeader>
                <CardHeader>{card.header3}</CardHeader>
                <CardMeta>{card.date}</CardMeta>
                <CardDescription>{card.description}</CardDescription>
              </>
            )}
          </CardContent>
          <CardContent extra>
            <Button disabled={loading} primary>
              ප්‍රකාශ කරන්න | Vote | வாக்கு
            </Button>
          </CardContent>
        </Card>
      ))}
    </CardGroup>
  </>
};

render(<VotingUI />, document.querySelector('#root'));

