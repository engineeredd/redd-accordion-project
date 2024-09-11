module.exports = (sequelize, DataTypes) => {
  const ExternalSystem = sequelize.define('ExternalSystem', {
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    baseURL: { 
      type: DataTypes.STRING 
    },
    authMethod: { 
      type: DataTypes.STRING 
    },
    key: { 
      type: DataTypes.STRING 
    },
    authPlace: { 
      type: DataTypes.ENUM('Header', 'QueryParameters') 
    },
    value: { 
      type: DataTypes.STRING 
    }
  }, {
    tableName: 'ExternalSystems',  // Explicitly define table name
  });

  ExternalSystem.associate = function(models) {
    ExternalSystem.hasMany(models.Planner, { 
      foreignKey: 'externalSystemId', 
      as: 'planners' 
    });
  };

  return ExternalSystem;
};