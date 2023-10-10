const sequelize = require('../config/database');

sequelize.query(`
CREATE OR REPLACE VIEW regular_user_view AS
SELECT
  u.id AS user_id,
  u.name AS user_name,
  u.email AS user_email,
  a.state AS address_state,
  u.roleId AS user_role,
  u.isActive AS is_user_active,
  a.street AS address_street,
  a.city AS address_city,
  a.CEP AS address_CEP
FROM UserAddresses AS ua
LEFT JOIN Users AS u ON ua.userId = u.id
LEFT JOIN Addresses AS a ON ua.addressId = a.id;
`
  ,
  { raw: true }).then(() => {
    console.log('regular_user_view criada');
  }).catch((error) => {
    console.error(error, "erro ao criar regular_user_view:");
  });
