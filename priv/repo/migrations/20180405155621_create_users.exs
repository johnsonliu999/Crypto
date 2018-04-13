defmodule CryptoMonitor.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :provider, :string
      add :name, :string
      add :photo, :string
      timestamps()
    end

  end
end
