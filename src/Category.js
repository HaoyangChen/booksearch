import React from "react";
import Button from '@material-ui/core/Button';
import { Redirect} from 'react-router-dom';
import './category.css';

export default class Category extends React.Component {
         state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
            let newCategoryText = this.props.buttonText.replace(/\W/g, '').toLowerCase();
            return <Redirect to={{
                pathname: '/Search',
                state: { categoryText: newCategoryText}
            }}/>
        }
      }
    render() {
        return(
            <div className="category-div">
                <img src={this.props.imageLink} alt={this.props.alt} onClick={this.setRedirect}></img>
                {this.renderRedirect()}
                <Button variant="contained" color="primary" onClick={this.setRedirect}>
                    {this.props.buttonText}
                </Button>
            </div>
        )
    }
}