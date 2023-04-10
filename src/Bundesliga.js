import React from 'react';
import Standing from './Standing';
import TopScorers from './TopScorers';
import YearInput from './YearInput';

export class Bundesliga extends React.Component {
	state = {
		year: '2022',
		standingLoading: true,
		topScorersLoading: true,
		flag: '',
		standing: [],
		topScorers: [],
		apiMessage: null
	};

	onTermSubmit = async (term) => {
		await fetch(`https://v3.football.api-sports.io/standings?league=78&season=${term}`, {
			method: 'GET',
			headers: {
				'x-rapidapi-key': '9926fb7beac5dabf66069e663a5380bc',
				'x-rapidapi-host': 'v3.football.api-sports.io'
			}
		})
			.then(async (response) => {
				const data = await response.json();
				if (data.message) {
					this.setState({ apiMessage: data.message, standingLoading: false });
				} else {
					this.setState({
						year: term,
						standingLoading: false,
						standing: data.response[0].league.standings[0],
						flag: data.response[0].league.flag
					});
				}
			})
			.catch(async (err) => {
				console.error(err);
			});

		await fetch(`https://v3.football.api-sports.io/players/topscorers?season=${term}&league=78`, {
			method: 'GET',
			headers: {
				'x-rapidapi-key': '9926fb7beac5dabf66069e663a5380bc',
				'x-rapidapi-host': 'v3.football.api-sports.io'
			}
		})
			.then(async (response) => {
				const data = await response.json();
				if (data.message) {
					this.setState({ apiMessage: data.message, topScorersLoading: false });
				} else {
					this.setState({ topScorersLoading: false, topScorers: data.response });
				}
			})
			.catch(async (err) => {
				console.error(err);
			});
	};
	componentDidMount() {
		const year = this.state.year;
		this.onTermSubmit(year);
	}
	render() {
		return (
			<div className="ui container">
				<YearInput leagueLogo={this.state.flag} league="Bundesliga" onFormSubmit={this.onTermSubmit} />

				<div className="ui two cards">
					<Standing
						loading={this.state.standingLoading}
						standingDetails={this.state}
						apiMessage={this.state.apiMessage}
					/>
					<TopScorers
						loading={this.state.topScorersLoading}
						topScorersDetails={this.state.topScorers}
						apiMessage={this.state.apiMessage}
					/>
				</div>
			</div>
		);
	}
}

export default Bundesliga;
