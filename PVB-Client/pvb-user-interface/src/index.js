import React, { useState } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  Divider,
  Image,
  Placeholder,
  PlaceholderHeader,
  PlaceholderImage,
  PlaceholderLine,
} from 'semantic-ui-react';

const cards = [
  {
    id: 'option_1',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/NPP_Symbol.png/100px-NPP_Symbol.png',
    header1: "ජාතික ජන බලවේගය",
    header2: "National People's Power",
    header3: "தேசிய மக்கள் சக்தி",

  },
  {
    id: 'option_2',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png/180px-Samagi_Jana_Balawegaya_-_Telephone_Symbol_-_Black.png',
    header1: "සමගි ජනබලවේගය",
    header2: "Samagi Jana Balawegaya",
    header3: "ஐக்கிய மக்கள் சக்தி",
  },
  {
    id: 'option_3',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sri_Lanka_Podujana_Peramuna_election_symbol.svg/125px-Sri_Lanka_Podujana_Peramuna_election_symbol.svg.png',
    header1: "ශ්‍රී ලංකා පොදුජන පෙරමුණ",
    header2: "Sri Lanka Podujana Peramuna ",
    header3: "இலங்கை பொதுஜன முன்னணி",
  },
]

const VotingUI = () => {
  const [loading, setLoading] = useState(false);
  const [voteForOption1, setVoteForOption1] = useState(0);
  const [voteForOption2, setVoteForOption2] = useState(0);
  const [voteForOption3, setVoteForOption3] = useState(0);
  const handleLoadingClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2500)
  }
  return (
    <>
      <Button loading={loading} onClick={handleLoadingClick} primary>
        Refresh | නැවුම් කරන්න | புதுப்பிப்பு
      </Button>
      <Divider />
      {voteForOption1}
      {voteForOption2}
      {voteForOption3}
      <Divider />
      <CardGroup doubling itemsPerRow={3} stackable>
        {_.map(cards, (card) => (
          <Card key={card.header1}>

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
                </Placeholder>
              ) : (
                <>
                  <CardHeader>{card.header1}</CardHeader>
                  <CardHeader>{card.header2}</CardHeader>
                  <CardHeader>{card.header3}</CardHeader>
                </>
              )}
            </CardContent>

            <CardContent extra>
              <Button disabled={loading}
                onClick={() => card.id === 'option_1' ?
                  setVoteForOption1(voteForOption1 + 1)
                  : card.id === 'option_2' ?
                    setVoteForOption2(voteForOption2 + 1)
                    : setVoteForOption3(voteForOption3 + 1)}
                primary>
                චන්දය ප්‍රකාශ කරන්න | Cast Vote | ஓட்டு போடுங்கள்
              </Button>
              <Divider />
              <Button disabled={loading}
                onClick={() => card.id === 'option_1' ?
                  setVoteForOption1(voteForOption1 - 1)
                  : card.id === 'option_2' ?
                    setVoteForOption2(voteForOption2 - 1)
                    : setVoteForOption3(voteForOption3 - 1)} primary>
                චන්දය අවලංගු කරන්න | Cancel Vote | வாக்கை ரத்து செய்
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardGroup>
    </>
  );
};

render(<VotingUI />, document.querySelector('#root'));

