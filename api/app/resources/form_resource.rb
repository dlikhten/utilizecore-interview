class FormResource < Graphiti::Resource
  self.adapter = Graphiti::Adapters::Null
  self.endpoint_namespace = "/api"

  self.attributes_filterable_by_default = false
  self.attributes_sortable_by_default = false
  self.attributes_schema_by_default = false

  self.attributes_readable_by_default = true
  self.attributes_writable_by_default = true

  def current_practice
    context.current_practice
  end

  def current_user
    context.current_user
  end

  def current_staff_member
    context.current_staff_member
  end

  def current_client
    context.current_client
  end

  def impersonating?
    context.impersonating?
  end

  def build(model_class)
    model_class.new
  end

  def base_scope
    { id: nil }
  end

  def assign_attributes(model, attributes)
    model.attributes = attributes
  end

  def save(model, meta = nil)
    %w{user practice staff_member client}.each do |attr|
      model.send(:"current_#{attr}=", self.send(:"current_#{attr}")) if model.respond_to?(:"current_#{attr}")
    end
    model.tap { model.save }
  end

  def resolve(scope)
    obj = model.new
    obj.id = scope[:id]
    obj.hydrate if obj.respond_to?(:hydrate)
    [obj]
  end

  filter :id, :integer, only: [:eq], single: true do
    eq do |scope, value|
      scope[:id] = value
      scope
    end
  end

  def destroy(attributes)
    raise "not permitted"
  end
end