import React from 'react';
import { Link } from 'react-router-dom';

import classes from './HomePage.module.css';

const quotes = {
	"The best way to get started is to quit talking and begin doing." : "Walt Disney",
	"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty." : "Winston Churchill",
	"Don't let yesterday take up too much of today." : "Will Rogers",
	"You learn more from failure than from success. Don't let it stop you. Failure builds character." : "Jack Canfield",
	"It's not whether you get knocked down. It's whether you get up." : "Vince Lombardi",
	"If you are working on something that you really care about, you don't have to be pushed. The vision pulls you." : "Steve Jobs",
	"People who are crazy enough to think they can change the world, are the ones who do." : "Rob Siltanen",
	"Failure will never overtake me if my determination to succeed is strong enough." : "Og Mandino",
	"Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk." : "Mohnish Pabrai",
	"We may encounter many defeats but we must not be defeated." : "Maya Angelou",
	"Knowing is not enough; we must apply.Wishing is not enough; we must do." : "Johann Wolfgang Von Goethe",
	"Imagine your life is perfect in every respect; what would it look like?" : "Brian Tracy",
	"We generate fears while we sit. We overcome them by action." : "Dr. Henry Link",
	"Whether you think you can or think you can't, you're right." : "Henry Ford",
	"Security is mostly a superstition. Life is either a daring adventure or nothing." : "Helen Keller",
	"The man who has confidence in himself gains the confidence of others." : "Hasidic Proverb",
	"The only limit to our realization of tomorrow will be our doubts of today." : "Franklin D. Roosevelt",
	"Creativity is intelligence and having fun." : "Albert Einstein",
	"What you lack in talent can be made up with desire, hustle and giving 110% all the time." : "Don Zimmer",
	"Do what you can with all you have, wherever you are." : "Theodore Roosevelt",
	"You are never too old to set another goal or to dream a new dream." : "C.S.Lewis",
	"To see what is right and not do it is a lack of courage." : "Confucius",
	"Reading is to the mind, as exercise to the body." : "Brian Tracy",
	"Things work out best for those who make the best of how things work out." : "John Wooden",
	"A room without a book is like a body without a soul." : "Marcus Tullius",
	"Today's accomplishments were yesterday's impossibilities." : "Robert H. Schuller",
	"You don't have to be great to start, but you have to start to be great." : "Zig Ziglar",
	"The only way to do great work is to love what you do.If you haven't found it yet, keep looking. Don't settle." : "Steve Jobs",
	"I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time." : "Michael Phelps",
}

function HomePage() {
    let linkTo = "/login";

    if (localStorage.getItem('auth-token')) {
        linkTo = "/notes";
    }

	const randQuote = () => {
		return Object.keys(quotes)[Math.floor(Math.random() * Object.keys(quotes).length)];
	}

    return (
		<div className={classes.HomePage + " jumbotron text-center"} style={{position: 'fixed', width: '100%', height: '100%'}}>
			<div className={classes.Extras}>
				<h1 className={classes.Heading}>UPLIFT</h1>
				<p className={classes.Text}>Make your day more productive!</p>
				<div className={classes.OuterBorder}>
					<p className={classes.OtherText}>Quote of the Day:</p>
					<blockquote className={classes.Blockquote}>
						"{randQuote()}"
					</blockquote>
					<cite className={classes.Cite}>- {quotes[randQuote()]}</cite>
				</div>
				<Link to={linkTo}><button className="btn btn-outline-light btn-lg mt-4">Get Started</button></Link>
			</div>
		</div>
    );
}

export default HomePage;