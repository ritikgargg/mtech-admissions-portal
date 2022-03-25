import React from 'react'
import 'rsuite/dist/rsuite.css';
import { TagPicker } from 'rsuite';


export default function App() {

// Sample data
const options = [{
	"label": "Monday",
	"value": "Monday",
	"role": "Master",
},
{
	"label": "Tuesday",
	"value": "Tuesday",
	"role": "Master",
},
{
	"label": "Wednesday",
	"value": "Wednesday",
	"role": "Master",
},
{
	"label": "Thursday",
	"value": "Thursday",
	"role": "Master",
},
{
	"label": "Friday",
	"value": "Friday",
	"role": "Master",
},
{
	"label": "Saturday",
	"value": "Saturday",
	"role": "Master",
},
{
	"label": "Sunday",
	"value": "Sunday",
	"role": "Master",
}]

return (
	<div style={{
	display: 'block', width: 600, paddingLeft: 30,position: 'relative'
	}}>
	<h4>React Suite TagPicker Component</h4>
	<TagPicker style={{width:300}}
				placeholder="Select Weekday" data={options} />
	</div>
);
}
