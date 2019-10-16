// Node modules
import React, { Component } from 'react';
// Material-UI
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
// Own modules
import UserConsumer from '../../context/UserContext';
import LocalStorage from '../../utils/Storage';

/**
 * Register Form
 */
export default class Profile extends Component {
  
  /**
   * Uso del contexto en el cualquier metodo del componente 
   */ 
  static contextType = UserConsumer;

  /**
   * Did mount
   */
  componentDidMount() {
    // Chequeo sesion del contexto, si no existe redirijo a register
    const session = this.context.session
    if (!session) {
      return this.props.history.push('/register');
    } 
  }

  /**
   * Render
   */
  render() {   
    return (
      <UserConsumer.Consumer>
        { props => { 
          return <div className='Login'>
                  <div className='Login__Wrapper'>
                    <form className='Login__Form'>
                      <img src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' className='Login__Logo' alt='nodepop-logo' />
                      <FormControl>
                        <Input
                          name='name'
                          value={props.session.name}
                          readOnly
                          type='text' 
                          startAdornment={
                            <InputAdornment position='start' className='InputIcon-icon'>
                              <AccountCircleIcon/>
                            </InputAdornment>
                          }
                          endAdornment={this.props.endAdornment}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          name='surname'
                          value={props.session.surname}
                          type='text' 
                          readOnly
                          startAdornment={
                            <InputAdornment position='start' className='InputIcon-icon'>
                              <AccountCircleIcon/>
                            </InputAdornment>
                          }
                          endAdornment={this.props.endAdornment}
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          name='birthday'
                          value={props.session.birthday || ''}
                          type='date' 
                          readOnly
                          startAdornment={
                            <InputAdornment position='start' className='InputIcon-icon'>
                              <CakeIcon/>
                            </InputAdornment>
                          }
                          endAdornment={this.props.endAdornment}
                        />
                      </FormControl>
                      <FormControl>
                        <Input 
                          name='api_key'
                          value={props.session.api_key}
                          placeholder='type your api key' 
                          type='text'
                          readOnly
                          startAdornment={
                            <InputAdornment position='start' className='InputIcon-icon'>
                              <LockOpenIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Button className='button' variant='contained' color='primary' onClick={this.handleDelete}> Delete data </Button>
                    </form>
                  </div>
                </div>
        }}
      </UserConsumer.Consumer>
    );
  }

  /**
   * Delete local storage and redirect to register
   */
  handleDelete = () => {
    LocalStorage.cleanLocalStorage();
    this.context.session = {};
    return this.props.history.push('/register');
  }
}