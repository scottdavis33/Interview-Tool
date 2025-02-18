// src/InterviewForm.js
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InterviewForm = () => {
  // Overall step state:
  // 1: Consent
  // 2-14: Good Technology section
  // 15-27: Bad Technology section
  // 28: Emotions (New Tech Feelings)
  // 29: Learning Style section
  // 30: Final Combined Review
  // 31: Interview Complete
  const [step, setStep] = useState(1);

  // Consent
  const [consent, setConsent] = useState('');

  /*** GOOD TECHNOLOGY STATE VARIABLES ***/
  const [goodTech, setGoodTech] = useState('');
  const [goodTechNotes, setGoodTechNotes] = useState('');
  const [goodTechTimeline, setGoodTechTimeline] = useState('');
  const [goodTechTimelineNotes, setGoodTechTimelineNotes] = useState('');
  const [goodTechEase, setGoodTechEase] = useState(''); // "easy" or "hard"
  const [goodTechEaseNotes, setGoodTechEaseNotes] = useState('');
  const [goodTechEaseDetail, setGoodTechEaseDetail] = useState('');
  const [goodTechEaseDetailNotes, setGoodTechEaseDetailNotes] = useState('');
  const [goodTechReplaced, setGoodTechReplaced] = useState('');
  const [goodTechReplacedNotes, setGoodTechReplacedNotes] = useState('');
  const [goodTechReplacementDetail, setGoodTechReplacementDetail] = useState('');
  const [goodTechReplacementDetailNotes, setGoodTechReplacementDetailNotes] = useState('');
  const [goodTechConfusing, setGoodTechConfusing] = useState('');
  const [goodTechConfusingNotes, setGoodTechConfusingNotes] = useState('');
  const [goodTechConfusingDetail, setGoodTechConfusingDetail] = useState('');
  const [goodTechConfusingDetailNotes, setGoodTechConfusingDetailNotes] = useState('');
  const [goodTechMissing, setGoodTechMissing] = useState('');
  const [goodTechMissingNotes, setGoodTechMissingNotes] = useState('');
  const [goodTechMissingDetail, setGoodTechMissingDetail] = useState('');
  const [goodTechMissingDetailNotes, setGoodTechMissingDetailNotes] = useState('');
  const [goodTechTooMuch, setGoodTechTooMuch] = useState('');
  const [goodTechTooMuchNotes, setGoodTechTooMuchNotes] = useState('');
  const [goodTechTooMuchDetail, setGoodTechTooMuchDetail] = useState('');
  const [goodTechTooMuchDetailNotes, setGoodTechTooMuchDetailNotes] = useState('');
  const [goodTechUsageContext, setGoodTechUsageContext] = useState('');
  const [goodTechUsageContextNotes, setGoodTechUsageContextNotes] = useState('');
  const [goodTechFavoriteFeature, setGoodTechFavoriteFeature] = useState('');
  const [goodTechFavoriteFeatureNotes, setGoodTechFavoriteFeatureNotes] = useState('');

  /*** BAD TECHNOLOGY STATE VARIABLES ***/
  const [badTech, setBadTech] = useState('');
  const [badTechNotes, setBadTechNotes] = useState('');
  const [badTechTimeline, setBadTechTimeline] = useState('');
  const [badTechTimelineNotes, setBadTechTimelineNotes] = useState('');
  const [badTechEase, setBadTechEase] = useState(''); // "easy" or "hard"
  const [badTechEaseNotes, setBadTechEaseNotes] = useState('');
  const [badTechEaseDetail, setBadTechEaseDetail] = useState('');
  const [badTechEaseDetailNotes, setBadTechEaseDetailNotes] = useState('');
  const [badTechReplaced, setBadTechReplaced] = useState('');
  const [badTechReplacedNotes, setBadTechReplacedNotes] = useState('');
  const [badTechReplacementDetail, setBadTechReplacementDetail] = useState('');
  const [badTechReplacementDetailNotes, setBadTechReplacementDetailNotes] = useState('');
  const [badTechMissing, setBadTechMissing] = useState('');
  const [badTechMissingNotes, setBadTechMissingNotes] = useState('');
  const [badTechMissingDetail, setBadTechMissingDetail] = useState('');
  const [badTechMissingDetailNotes, setBadTechMissingDetailNotes] = useState('');
  const [badTechTooMuch, setBadTechTooMuch] = useState('');
  const [badTechTooMuchNotes, setBadTechTooMuchNotes] = useState('');
  const [badTechTooMuchDetail, setBadTechTooMuchDetail] = useState('');
  const [badTechTooMuchDetailNotes, setBadTechTooMuchDetailNotes] = useState('');
  const [badTechLiked, setBadTechLiked] = useState('');
  const [badTechLikedNotes, setBadTechLikedNotes] = useState('');
  const [badTechLikedDetail, setBadTechLikedDetail] = useState('');
  const [badTechLikedDetailNotes, setBadTechLikedDetailNotes] = useState('');
  const [badTechBiggestFrustration, setBadTechBiggestFrustration] = useState('');
  const [badTechBiggestFrustrationNotes, setBadTechBiggestFrustrationNotes] = useState('');
  const [badTechDesiredChange, setBadTechDesiredChange] = useState('');
  const [badTechDesiredChangeNotes, setBadTechDesiredChangeNotes] = useState('');

  /*** EMOTIONS SECTION (Only New Tech Feelings) ***/
  const [emotionsNewTechFeeling, setEmotionsNewTechFeeling] = useState('');
  const [emotionsNewTechFeelingNotes, setEmotionsNewTechFeelingNotes] = useState('');
  const [emotionsNewTechReason, setEmotionsNewTechReason] = useState('');
  const [emotionsNewTechReasonNotes, setEmotionsNewTechReasonNotes] = useState('');

  /*** LEARNING STYLE SECTION VARIABLES ***/
  // Ratings are on a scale of 1-5 (with 3 being indifferent and 5 meaning "love it")
  const [learnTutorials, setLearnTutorials] = useState('');
  const [learnWritten, setLearnWritten] = useState('');
  const [learnIllustrated, setLearnIllustrated] = useState('');
  const [learnVideos, setLearnVideos] = useState('');
  const [learnLiveChat, setLearnLiveChat] = useState('');
  const [learnForums, setLearnForums] = useState('');
  const [learnOneOnOne, setLearnOneOnOne] = useState('');
  const [learnGroup, setLearnGroup] = useState('');
  const [learnGamified, setLearnGamified] = useState('');

  // Ref for the review section (for PDF generation)
  const reviewRef = useRef(null);

  // Helper to render additional notes.
  const renderNotes = (notes) => {
    if (notes.trim()) {
      return (
        <ul style={{ marginLeft: '20px' }}>
          <li>{notes}</li>
        </ul>
      );
    }
    return null;
  };

  // Styles for the review container and its elements.
  const reviewContainerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };
  const reviewHeadingStyle = {
    borderBottom: '2px solid #ccc',
    paddingBottom: '5px',
    marginBottom: '10px',
    color: '#333'
  };
  const reviewSubheadingStyle = {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#555'
  };
  const reviewParagraphStyle = {
    margin: '5px 0',
    lineHeight: '1.5'
  };

  // Handler for consent.
  const handleConsent = (value) => {
    setConsent(value);
    if (value === 'yes') {
      setStep(2);
    } else {
      alert("Recording consent is required to proceed with the interview.");
    }
  };

  // Restart interview: resets all state variables.
  const restartInterview = () => {
    setConsent('');
    // Reset Good Tech variables
    setGoodTech('');
    setGoodTechNotes('');
    setGoodTechTimeline('');
    setGoodTechTimelineNotes('');
    setGoodTechEase('');
    setGoodTechEaseNotes('');
    setGoodTechEaseDetail('');
    setGoodTechEaseDetailNotes('');
    setGoodTechReplaced('');
    setGoodTechReplacedNotes('');
    setGoodTechReplacementDetail('');
    setGoodTechReplacementDetailNotes('');
    setGoodTechConfusing('');
    setGoodTechConfusingNotes('');
    setGoodTechConfusingDetail('');
    setGoodTechConfusingDetailNotes('');
    setGoodTechMissing('');
    setGoodTechMissingNotes('');
    setGoodTechMissingDetail('');
    setGoodTechMissingDetailNotes('');
    setGoodTechTooMuch('');
    setGoodTechTooMuchNotes('');
    setGoodTechTooMuchDetail('');
    setGoodTechTooMuchDetailNotes('');
    setGoodTechUsageContext('');
    setGoodTechUsageContextNotes('');
    setGoodTechFavoriteFeature('');
    setGoodTechFavoriteFeatureNotes('');
    // Reset Bad Tech variables
    setBadTech('');
    setBadTechNotes('');
    setBadTechTimeline('');
    setBadTechTimelineNotes('');
    setBadTechEase('');
    setBadTechEaseNotes('');
    setBadTechEaseDetail('');
    setBadTechEaseDetailNotes('');
    setBadTechReplaced('');
    setBadTechReplacedNotes('');
    setBadTechReplacementDetail('');
    setBadTechReplacementDetailNotes('');
    setBadTechMissing('');
    setBadTechMissingNotes('');
    setBadTechMissingDetail('');
    setBadTechMissingDetailNotes('');
    setBadTechTooMuch('');
    setBadTechTooMuchNotes('');
    setBadTechTooMuchDetail('');
    setBadTechTooMuchDetailNotes('');
    setBadTechLiked('');
    setBadTechLikedNotes('');
    setBadTechLikedDetail('');
    setBadTechLikedDetailNotes('');
    setBadTechBiggestFrustration('');
    setBadTechBiggestFrustrationNotes('');
    setBadTechDesiredChange('');
    setBadTechDesiredChangeNotes('');
    // Reset Emotions variables
    setEmotionsNewTechFeeling('');
    setEmotionsNewTechFeelingNotes('');
    setEmotionsNewTechReason('');
    setEmotionsNewTechReasonNotes('');
    // Reset Learning Style variables
    setLearnTutorials('');
    setLearnWritten('');
    setLearnIllustrated('');
    setLearnVideos('');
    setLearnLiveChat('');
    setLearnForums('');
    setLearnOneOnOne('');
    setLearnGroup('');
    setLearnGamified('');
    setStep(1);
  };

  // Save the review section as a PDF.
  const saveReviewToPdf = () => {
    if (reviewRef.current) {
      html2canvas(reviewRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('review.pdf');
      });
    }
  };

  // Final Combined Review rendering.
  const renderCombinedReview = () => (
    <div style={reviewContainerStyle}>
      <h2 style={reviewHeadingStyle}>Final Review</h2>

      <h3 style={reviewSubheadingStyle}>Good Technology</h3>
      <p style={reviewParagraphStyle}><strong>Technology:</strong> {goodTech}</p>
      {renderNotes(goodTechNotes)}
      <p style={reviewParagraphStyle}>
        <strong>First Impressions:</strong>{" "}
        {goodTechTimeline === 'immediately'
          ? 'Liked it right away'
          : 'Grew positive over time'}
      </p>
      {renderNotes(goodTechTimelineNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Ease of Learning:</strong>{" "}
        {goodTechEase === 'easy'
          ? 'Easy to learn'
          : 'Confusing at first'}
      </p>
      {renderNotes(goodTechEaseNotes)}
      <p style={reviewParagraphStyle}><strong>Learning Details:</strong> {goodTechEaseDetail}</p>
      {renderNotes(goodTechEaseDetailNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Replacement:</strong>{" "}
        {goodTechReplaced === 'yes'
          ? 'Replaced another technology'
          : 'Addressed a new problem'}
      </p>
      {renderNotes(goodTechReplacedNotes)}
      <p style={reviewParagraphStyle}><strong>Replacement Details:</strong> {goodTechReplacementDetail}</p>
      {renderNotes(goodTechReplacementDetailNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Confusing Element:</strong> {goodTechConfusing === 'yes' ? 'Yes' : 'No'}
      </p>
      {renderNotes(goodTechConfusingNotes)}
      {goodTechConfusing === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Confusing Details:</strong> {goodTechConfusingDetail}</p>
      )}
      {goodTechConfusing === 'yes' && renderNotes(goodTechConfusingDetailNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Missing Feature:</strong> {goodTechMissing === 'yes' ? 'Yes' : 'No'}
      </p>
      {renderNotes(goodTechMissingNotes)}
      {goodTechMissing === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Missing Details:</strong> {goodTechMissingDetail}</p>
      )}
      {goodTechMissing === 'yes' && renderNotes(goodTechMissingDetailNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Too Much Functionality:</strong> {goodTechTooMuch === 'yes' ? 'Yes' : 'No'}
      </p>
      {renderNotes(goodTechTooMuchNotes)}
      {goodTechTooMuch === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Functionality Details:</strong> {goodTechTooMuchDetail}</p>
      )}
      {goodTechTooMuch === 'yes' && renderNotes(goodTechTooMuchDetailNotes)}
      <p style={reviewParagraphStyle}><strong>Usage Context:</strong> {goodTechUsageContext}</p>
      {renderNotes(goodTechUsageContextNotes)}
      <p style={reviewParagraphStyle}><strong>Favorite Feature:</strong> {goodTechFavoriteFeature}</p>
      {renderNotes(goodTechFavoriteFeatureNotes)}

      <h3 style={reviewSubheadingStyle}>Bad Technology</h3>
      <p style={reviewParagraphStyle}><strong>Technology:</strong> {badTech}</p>
      {renderNotes(badTechNotes)}
      <p style={reviewParagraphStyle}>
        <strong>First Impressions:</strong>{" "}
        {badTechTimeline === 'immediately'
          ? 'Disliked it right away'
          : 'Grew more negative over time'}
      </p>
      {renderNotes(badTechTimelineNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Ease of Learning:</strong>{" "}
        {badTechEase === 'easy'
          ? 'Easy to learn'
          : 'Confusing at first'}
      </p>
      {renderNotes(badTechEaseNotes)}
      <p style={reviewParagraphStyle}><strong>Learning Details:</strong> {badTechEaseDetail}</p>
      {renderNotes(badTechEaseDetailNotes)}
      <p style={reviewParagraphStyle}>
        <strong>Replacement:</strong>{" "}
        {badTechReplaced === 'yes'
          ? 'Replaced another technology'
          : 'Addressed a specific need'}
      </p>
      {renderNotes(badTechReplacedNotes)}
      <p style={reviewParagraphStyle}><strong>Replacement Details:</strong> {badTechReplacementDetail}</p>
      {renderNotes(badTechReplacementDetailNotes)}
      <p style={reviewParagraphStyle}><strong>Missing Feature:</strong> {badTechMissing === 'yes' ? 'Yes' : 'No'}</p>
      {renderNotes(badTechMissingNotes)}
      {badTechMissing === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Missing Details:</strong> {badTechMissingDetail}</p>
      )}
      {badTechMissing === 'yes' && renderNotes(badTechMissingDetailNotes)}
      <p style={reviewParagraphStyle}><strong>Too Much Functionality:</strong> {badTechTooMuch === 'yes' ? 'Yes' : 'No'}</p>
      {renderNotes(badTechTooMuchNotes)}
      {badTechTooMuch === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Functionality Details:</strong> {badTechTooMuchDetail}</p>
      )}
      {badTechTooMuch === 'yes' && renderNotes(badTechTooMuchDetailNotes)}
      <p style={reviewParagraphStyle}><strong>Liked Element:</strong> {badTechLiked === 'yes' ? 'Yes' : 'No'}</p>
      {renderNotes(badTechLikedNotes)}
      {badTechLiked === 'yes' && (
        <p style={reviewParagraphStyle}><strong>Liked Element Details:</strong> {badTechLikedDetail}</p>
      )}
      {badTechLiked === 'yes' && renderNotes(badTechLikedDetailNotes)}
      <p style={reviewParagraphStyle}><strong>Biggest Frustration:</strong> {badTechBiggestFrustration}</p>
      {renderNotes(badTechBiggestFrustrationNotes)}
      <p style={reviewParagraphStyle}><strong>Desired Change:</strong> {badTechDesiredChange}</p>
      {renderNotes(badTechDesiredChangeNotes)}

      <h3 style={reviewSubheadingStyle}>Emotions</h3>
      <p style={reviewParagraphStyle}><strong>New Tech Feelings:</strong> {emotionsNewTechFeeling}</p>
      {renderNotes(emotionsNewTechFeelingNotes)}
      <p style={reviewParagraphStyle}><strong>Reason:</strong> {emotionsNewTechReason}</p>
      {renderNotes(emotionsNewTechReasonNotes)}

      <h3 style={reviewSubheadingStyle}>Learning Style</h3>
      <p style={reviewParagraphStyle}><strong>Step-by-step Tutorials:</strong> {learnTutorials}</p>
      <p style={reviewParagraphStyle}><strong>Written Instructions:</strong> {learnWritten}</p>
      <p style={reviewParagraphStyle}><strong>Illustrated Instructions:</strong> {learnIllustrated}</p>
      <p style={reviewParagraphStyle}><strong>Instructional Videos:</strong> {learnVideos}</p>
      <p style={reviewParagraphStyle}><strong>Live Typed Chat:</strong> {learnLiveChat}</p>
      <p style={reviewParagraphStyle}><strong>Online Forums:</strong> {learnForums}</p>
      <p style={reviewParagraphStyle}><strong>1:1 In-Person Training:</strong> {learnOneOnOne}</p>
      <p style={reviewParagraphStyle}><strong>Group In-Person Training:</strong> {learnGroup}</p>
      <p style={reviewParagraphStyle}><strong>Gamified Learning:</strong> {learnGamified}</p>
      <br />
      <button onClick={() => setStep(31)}>Finish Interview</button>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Step 1: Consent */}
      {step === 1 && (
        <div>
          <h2>Recording Consent</h2>
          <p>Do you consent to being recorded?</p>
          <button onClick={() => handleConsent('yes')}>Yes</button>
          <button onClick={() => handleConsent('no')}>No</button>
        </div>
      )}

      {/* GOOD TECHNOLOGY SECTION */}
      {step === 2 && (
        <div>
          <h2>Good Technology: Identification</h2>
          <p>Please name a piece of technology you like and feel comfortable using.</p>
          <textarea
            value={goodTech}
            onChange={(e) => setGoodTech(e.target.value)}
            placeholder="Enter technology name"
            rows={2}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechNotes}
              onChange={(e) => setGoodTechNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTech} onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Good Technology: First Impressions</h2>
          <p>Did you like it right away or did your positive feelings grow over time?</p>
          <button onClick={() => { setGoodTechTimeline('immediately'); setStep(4); }}>Liked it right away</button>
          <button onClick={() => { setGoodTechTimeline('overTime'); setStep(4); }}>Grew positive over time</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechTimelineNotes}
              onChange={(e) => setGoodTechTimelineNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Good Technology: Ease of Learning</h2>
          <p>Was it easy to learn and start using?</p>
          <button onClick={() => { setGoodTechEase('easy'); setStep(5); }}>Yes, it was easy</button>
          <button onClick={() => { setGoodTechEase('hard'); setStep(5); }}>No, it was confusing at first</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechEaseNotes}
              onChange={(e) => setGoodTechEaseNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2>Good Technology: Learning Details</h2>
          {goodTechEase === 'easy' ? (
            <p>What made it friendly for beginners?</p>
          ) : (
            <p>What aspects made it confusing or unfriendly?</p>
          )}
          <textarea
            value={goodTechEaseDetail}
            onChange={(e) => setGoodTechEaseDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechEaseDetailNotes}
              onChange={(e) => setGoodTechEaseDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechEaseDetail} onClick={() => setStep(6)}>Next</button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2>Good Technology: Replacement?</h2>
          <p>Did it replace another technology that performed the same function?</p>
          <button onClick={() => { setGoodTechReplaced('yes'); setStep(7); }}>Yes</button>
          <button onClick={() => { setGoodTechReplaced('no'); setStep(7); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechReplacedNotes}
              onChange={(e) => setGoodTechReplacedNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <h2>Good Technology: Replacement Details</h2>
          {goodTechReplaced === 'yes' ? (
            <p>What was the previous technology, and how do they compare?</p>
          ) : (
            <p>What problem did it solve that motivated you to try this technology?</p>
          )}
          <textarea
            value={goodTechReplacementDetail}
            onChange={(e) => setGoodTechReplacementDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechReplacementDetailNotes}
              onChange={(e) => setGoodTechReplacementDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechReplacementDetail} onClick={() => setStep(8)}>Next</button>
        </div>
      )}

      {step === 8 && (
        <div>
          <h2>Good Technology: Confusing or Unsatisfactory Elements</h2>
          <p>Is there an element of the technology that confuses you or that you don't like?</p>
          <button onClick={() => { setGoodTechConfusing('yes'); setStep(9); }}>Yes</button>
          <button onClick={() => { setGoodTechConfusing('no'); setStep(10); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechConfusingNotes}
              onChange={(e) => setGoodTechConfusingNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 9 && goodTechConfusing === 'yes' && (
        <div>
          <h2>Good Technology: Confusing Elements Details</h2>
          <p>Please describe what is confusing or unsatisfactory.</p>
          <textarea
            value={goodTechConfusingDetail}
            onChange={(e) => setGoodTechConfusingDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechConfusingDetailNotes}
              onChange={(e) => setGoodTechConfusingDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechConfusingDetail} onClick={() => setStep(10)}>Next</button>
        </div>
      )}

      {step === 10 && (
        <div>
          <h2>Good Technology: Missing Features</h2>
          <p>Is there something missing from the technology?</p>
          <button onClick={() => { setGoodTechMissing('yes'); setStep(11); }}>Yes</button>
          <button onClick={() => { setGoodTechMissing('no'); setStep(11); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechMissingNotes}
              onChange={(e) => setGoodTechMissingNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 11 && goodTechMissing === 'yes' && (
        <div>
          <h2>Good Technology: Missing Features Details</h2>
          <p>What is missing, and how should it work?</p>
          <textarea
            value={goodTechMissingDetail}
            onChange={(e) => setGoodTechMissingDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechMissingDetailNotes}
              onChange={(e) => setGoodTechMissingDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechMissingDetail} onClick={() => setStep(12)}>Next</button>
        </div>
      )}

      {step === 11 && goodTechMissing === 'no' && (
        <div>{setTimeout(() => setStep(12), 0)}</div>
      )}

      {step === 12 && (
        <div>
          <h2>Good Technology: Too Much Functionality?</h2>
          <p>Is there too much functionality?</p>
          <button onClick={() => { setGoodTechTooMuch('yes'); setStep(13); }}>Yes</button>
          <button onClick={() => { setGoodTechTooMuch('no'); setStep(13); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechTooMuchNotes}
              onChange={(e) => setGoodTechTooMuchNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 13 && goodTechTooMuch === 'yes' && (
        <div>
          <h2>Good Technology: Functionality Details</h2>
          <p>What functionality would you remove or simplify?</p>
          <textarea
            value={goodTechTooMuchDetail}
            onChange={(e) => setGoodTechTooMuchDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechTooMuchDetailNotes}
              onChange={(e) => setGoodTechTooMuchDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechTooMuchDetail} onClick={() => setStep(14)}>Next</button>
        </div>
      )}

      {step === 13 && goodTechTooMuch === 'no' && (
        <div>{setTimeout(() => setStep(14), 0)}</div>
      )}

      {step === 14 && (
        <div>
          <h2>Good Technology: Additional Questions</h2>
          <p>How often do you use this technology and in what contexts (e.g., work, leisure)?</p>
          <textarea
            value={goodTechUsageContext}
            onChange={(e) => setGoodTechUsageContext(e.target.value)}
            placeholder="Enter usage context..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechUsageContextNotes}
              onChange={(e) => setGoodTechUsageContextNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <p>What is the feature you like most about this technology?</p>
          <textarea
            value={goodTechFavoriteFeature}
            onChange={(e) => setGoodTechFavoriteFeature(e.target.value)}
            placeholder="Enter favorite feature..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={goodTechFavoriteFeatureNotes}
              onChange={(e) => setGoodTechFavoriteFeatureNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!goodTechUsageContext || !goodTechFavoriteFeature} onClick={() => setStep(15)}>Next</button>
        </div>
      )}

      {/* BAD TECHNOLOGY SECTION */}
      {step === 15 && (
        <div>
          <h2>Bad Technology: Identification</h2>
          <p>Please name a piece of technology you dislike and feel uncomfortable using.</p>
          <textarea
            value={badTech}
            onChange={(e) => setBadTech(e.target.value)}
            placeholder="Enter technology name"
            rows={2}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechNotes}
              onChange={(e) => setBadTechNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTech} onClick={() => setStep(16)}>Next</button>
        </div>
      )}

      {step === 16 && (
        <div>
          <h2>Bad Technology: First Impressions</h2>
          <p>Did you dislike it right away or did your negative feelings grow over time?</p>
          <button onClick={() => { setBadTechTimeline('immediately'); setStep(17); }}>Disliked it right away</button>
          <button onClick={() => { setBadTechTimeline('overTime'); setStep(17); }}>Grew negative over time</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechTimelineNotes}
              onChange={(e) => setBadTechTimelineNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 17 && (
        <div>
          <h2>Bad Technology: Ease of Learning</h2>
          <p>Was it easy to learn and start using?</p>
          <button onClick={() => { setBadTechEase('easy'); setStep(18); }}>Yes, it was easy</button>
          <button onClick={() => { setBadTechEase('hard'); setStep(18); }}>No, it was confusing at first</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechEaseNotes}
              onChange={(e) => setBadTechEaseNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 18 && (
        <div>
          <h2>Bad Technology: Learning Details</h2>
          {badTechEase === 'easy' ? (
            <p>What made it friendly for beginners?</p>
          ) : (
            <p>What aspects made it confusing or unfriendly?</p>
          )}
          <textarea
            value={badTechEaseDetail}
            onChange={(e) => setBadTechEaseDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechEaseDetailNotes}
              onChange={(e) => setBadTechEaseDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechEaseDetail} onClick={() => setStep(19)}>Next</button>
        </div>
      )}

      {step === 19 && (
        <div>
          <h2>Bad Technology: Replacement?</h2>
          <p>Did it replace another technology that performed the same function?</p>
          <button onClick={() => { setBadTechReplaced('yes'); setStep(20); }}>Yes</button>
          <button onClick={() => { setBadTechReplaced('no'); setStep(20); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechReplacedNotes}
              onChange={(e) => setBadTechReplacedNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 20 && (
        <div>
          <h2>Bad Technology: Replacement Details</h2>
          {badTechReplaced === 'yes' ? (
            <p>What was the previous technology, and how do they compare?</p>
          ) : (
            <p>What problem did it solve that motivated you to try it?</p>
          )}
          <textarea
            value={badTechReplacementDetail}
            onChange={(e) => setBadTechReplacementDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechReplacementDetailNotes}
              onChange={(e) => setBadTechReplacementDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechReplacementDetail} onClick={() => setStep(21)}>Next</button>
        </div>
      )}

      {step === 21 && (
        <div>
          <h2>Bad Technology: Missing Features</h2>
          <p>Is there something missing from the technology?</p>
          <button onClick={() => { setBadTechMissing('yes'); setStep(22); }}>Yes</button>
          <button onClick={() => { setBadTechMissing('no'); setStep(22); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechMissingNotes}
              onChange={(e) => setBadTechMissingNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 22 && badTechMissing === 'yes' && (
        <div>
          <h2>Bad Technology: Missing Features Details</h2>
          <p>What is missing, and how should it work?</p>
          <textarea
            value={badTechMissingDetail}
            onChange={(e) => setBadTechMissingDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechMissingDetailNotes}
              onChange={(e) => setBadTechMissingDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechMissingDetail} onClick={() => setStep(23)}>Next</button>
        </div>
      )}

      {step === 22 && badTechMissing === 'no' && (
        <div>{setTimeout(() => setStep(23), 0)}</div>
      )}

      {step === 23 && (
        <div>
          <h2>Bad Technology: Too Much Functionality?</h2>
          <p>Is there too much functionality?</p>
          <button onClick={() => { setBadTechTooMuch('yes'); setStep(24); }}>Yes</button>
          <button onClick={() => { setBadTechTooMuch('no'); setStep(24); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechTooMuchNotes}
              onChange={(e) => setBadTechTooMuchNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 24 && badTechTooMuch === 'yes' && (
        <div>
          <h2>Bad Technology: Functionality Details</h2>
          <p>What functionality would you remove or simplify?</p>
          <textarea
            value={badTechTooMuchDetail}
            onChange={(e) => setBadTechTooMuchDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechTooMuchDetailNotes}
              onChange={(e) => setBadTechTooMuchDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechTooMuchDetail} onClick={() => setStep(25)}>Next</button>
        </div>
      )}

      {step === 24 && badTechTooMuch === 'no' && (
        <div>{setTimeout(() => setStep(25), 0)}</div>
      )}

      {step === 25 && (
        <div>
          <h2>Bad Technology: Liked Element?</h2>
          <p>Is there an element of the technology that you actually like?</p>
          <button onClick={() => { setBadTechLiked('yes'); setStep(26); }}>Yes</button>
          <button onClick={() => { setBadTechLiked('no'); setStep(26); }}>No</button>
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechLikedNotes}
              onChange={(e) => setBadTechLikedNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}

      {step === 26 && badTechLiked === 'yes' && (
        <div>
          <h2>Bad Technology: Liked Element Details</h2>
          <p>Please describe which element you like and why.</p>
          <textarea
            value={badTechLikedDetail}
            onChange={(e) => setBadTechLikedDetail(e.target.value)}
            placeholder="Enter details here"
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechLikedDetailNotes}
              onChange={(e) => setBadTechLikedDetailNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechLikedDetail} onClick={() => setStep(27)}>Next</button>
        </div>
      )}

      {step === 26 && badTechLiked === 'no' && (
        <div>{setTimeout(() => setStep(27), 0)}</div>
      )}

      {step === 27 && (
        <div>
          <h2>Bad Technology: Additional Questions</h2>
          <p>What is your biggest frustration when using this technology?</p>
          <textarea
            value={badTechBiggestFrustration}
            onChange={(e) => setBadTechBiggestFrustration(e.target.value)}
            placeholder="Enter your frustration..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechBiggestFrustrationNotes}
              onChange={(e) => setBadTechBiggestFrustrationNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <p>If you could change one thing about this technology, what would it be and why?</p>
          <textarea
            value={badTechDesiredChange}
            onChange={(e) => setBadTechDesiredChange(e.target.value)}
            placeholder="Enter your desired change..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={badTechDesiredChangeNotes}
              onChange={(e) => setBadTechDesiredChangeNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!badTechBiggestFrustration || !badTechDesiredChange} onClick={() => setStep(28)}>Next</button>
        </div>
      )}

      {/* EMOTIONS SECTION (Only New Tech Feelings) */}
      {step === 28 && (
        <div>
          <h2>Emotions: New Tech Feelings</h2>
          <p>How does the prospect of having to use new tech make you feel?</p>
          <textarea
            value={emotionsNewTechFeeling}
            onChange={(e) => setEmotionsNewTechFeeling(e.target.value)}
            placeholder="Enter your feelings..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={emotionsNewTechFeelingNotes}
              onChange={(e) => setEmotionsNewTechFeelingNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <p>Why do you think you feel that way?</p>
          <textarea
            value={emotionsNewTechReason}
            onChange={(e) => setEmotionsNewTechReason(e.target.value)}
            placeholder="Enter your reason..."
            rows={4}
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label><em>Additional Notes:</em></label>
            <textarea
              value={emotionsNewTechReasonNotes}
              onChange={(e) => setEmotionsNewTechReasonNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <button disabled={!emotionsNewTechFeeling || !emotionsNewTechReason} onClick={() => setStep(29)}>Next</button>
        </div>
      )}

      {/* LEARNING STYLE SECTION */}
      {step === 29 && (
        <div>
          <h2>Learning Style</h2>
          <p>How do you prefer to learn new tech? Please rate your feelings on a scale from 1 to 5 (3 = indifferent, 5 = love it):</p>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Step-by-step Tutorials:</strong></label>
            <select value={learnTutorials} onChange={(e) => setLearnTutorials(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Written Instructions:</strong></label>
            <select value={learnWritten} onChange={(e) => setLearnWritten(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Illustrated Instructions:</strong></label>
            <select value={learnIllustrated} onChange={(e) => setLearnIllustrated(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Instructional Videos:</strong></label>
            <select value={learnVideos} onChange={(e) => setLearnVideos(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Live Typed Chat:</strong></label>
            <select value={learnLiveChat} onChange={(e) => setLearnLiveChat(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Online Forums:</strong></label>
            <select value={learnForums} onChange={(e) => setLearnForums(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>1:1 In-Person Training:</strong></label>
            <select value={learnOneOnOne} onChange={(e) => setLearnOneOnOne(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Group In-Person Training:</strong></label>
            <select value={learnGroup} onChange={(e) => setLearnGroup(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label><strong>Gamified Learning:</strong></label>
            <select value={learnGamified} onChange={(e) => setLearnGamified(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 (Indifferent)</option>
              <option value="4">4</option>
              <option value="5">5 (Love it)</option>
            </select>
          </div>
          <br />
          <button disabled={
            !learnTutorials || !learnWritten || !learnIllustrated || !learnVideos ||
            !learnLiveChat || !learnForums || !learnOneOnOne || !learnGroup || !learnGamified
          } onClick={() => setStep(30)}>Next</button>
        </div>
      )}

      {/* FINAL COMBINED REVIEW */}
      {step === 30 && (
        <div>
          <div ref={reviewRef}>
            {renderCombinedReview()}
          </div>
          <br />
          <button onClick={saveReviewToPdf}>Save Review to PDF</button>
          <button onClick={() => setStep(31)} style={{ marginLeft: '10px' }}>
            Finish Interview
          </button>
        </div>
      )}

      {/* INTERVIEW COMPLETE */}
      {step === 31 && (
        <div>
          <h2>Interview Complete</h2>
          <p>Thank you for your responses!</p>
          <br />
          <button onClick={() => setStep(30)}>Review Responses</button>
          <button onClick={restartInterview} style={{ marginLeft: '10px' }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
