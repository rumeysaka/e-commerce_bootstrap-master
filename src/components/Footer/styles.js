import styled from 'styled-components';

export const Box = styled.div`
padding: 30px 30px;
background: #f7f7f7;
position: fixed;
width: 100%;
	bottom: 0px;

@media (max-width: 1000px) {
	padding: 20px 10px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(180px, 1fr));
}
`;

// export const FooterLink = styled.a`
// color:#292b2c;
// margin-bottom: 20px;
// font-size: 12px;
// text-decoration: none;

// &:hover {
// 	color: green;
// 	transition: 200ms ease-in;
// }
// `;

export const Heading = styled.p`
font-size: 14px;
color:#292b2c;
margin-bottom: 0px;

`;
