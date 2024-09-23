export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: '9e2d109c-54ce-4315-ac40-1136fc52e096',
      'Content-Type': 'application/json'
    }
  }
  
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`,
    {headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 
  
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`,
      {headers: config.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

export const postNewCardData = (newCard) => {
    return fetch(`${config.baseUrl}/cards`,
      {method: 'POST',
        body: JSON.stringify({
          name: newCard.name,
          link: newCard.link}),
        headers: config.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    } 
  
export const postProfileData = (name, description) => {
      return fetch(`${config.baseUrl}/users/me`,
        {method: 'PATCH',
          body: JSON.stringify({
            name: name,
            about: description }),
          headers: config.headers})
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
export const postNewAvatar = (avatar) => {
      return fetch(`${config.baseUrl}/users/me/avatar`,
        {method: 'PATCH',
          body: JSON.stringify({
            avatar: avatar }),
          headers: config.headers})
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }


export const removeCardData = (cardID) => {
        return fetch(`${config.baseUrl}/cards/${cardID}`,
          {method: 'DELETE',
           headers: config.headers})
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }
      
export const putLike = (cardID) => {
        return fetch(`${config.baseUrl}/cards/likes/${cardID}`,
          {method: 'PUT',
            headers: config.headers})
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
          });
        } 
      
export const removeLike = (cardID) => {
          return fetch(`${config.baseUrl}/cards/likes/${cardID}`,
            {method: 'DELETE',
              headers: config.headers})
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              
              return Promise.reject(`Ошибка: ${res.status}`);
            });
          } 
        
            